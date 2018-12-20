const mysql = require('mysql');
const crypto = require('crypto')
const dbconfig = require('./dbconfig.json');

const conn = mysql.createConnection(dbconfig);

conn.connect();

let iteration = 131093

const db = {
  registerUser (userInfo, cb) {
    crypto.randomBytes(64, (err, buf) => {
      let salt = buf.toString('base64')
      crypto.pbkdf2(userInfo.u_pw, salt, iteration, 64, 'sha512', (err, key) => {
        conn.query('alter table user auto_increment=1;', () => {
          with(userInfo){
            conn.query('insert into user(u_id, u_pw, u_name, u_email, u_introduction, salt) value (?, ?, ?, ?, ?, ?);',  [u_id, key.toString('base64'), u_name, u_email, u_intro, salt], cb);
          }
        });
      })
    })
  },
  findUser (userInfo, cb) {//로그인 시
    conn.query('select salt from user where u_id = ?', userInfo.uid, (err, [salt]) => {
      if (salt) {
        crypto.pbkdf2(userInfo.upw, salt.salt, iteration, 64, 'sha512', (err, key) => {
          conn.query('select u_no, u_id, u_name from user where u_id = ? and u_pw = ?',  [userInfo.uid, key.toString('base64')], cb);
        })
      } else {
        cb('E', 'E')
      }
    })
  },
  findUserByNo(u_no, cb) {//요청 시 토큰의 id값으로 유저 인증
    u_no = u_no * 1;
    conn.query('select u_id, u_name, u_email, u_introduction, u_follower, u_lectures from user where u_no = ?', u_no, cb);//수정
  },
  findUserById(u_id, cb) {
    conn.query('select u_no, u_id, u_name, u_email, u_introduction, u_follower, u_lectures from user where u_id = ?', u_id, cb);//수정
  },
  updateUserProfile(userInfo, cb) {
    with(userInfo){
      conn.query('update user set u_name = ?, u_email = ?, u_introduction = ? where u_no = ?', [u_name, u_email, u_intro, u_no], cb);
    }
  },
  getLectureBySubscribed (uno, cb) {
    conn.query('select l.l_no, l.l_wr_id, l.l_wr_name, l.l_title, l.l_thum, l.l_view, l.l_like from lecture l, subscribe s, user u where s.s_following_no = u.u_no and u.u_id = l.l_wr_id and s.s_follower_no = ? order by l_date desc limit 0, 10', uno, cb)
  },
  getLectureWithNewest(cb) {
    conn.query('select l_no, l_wr_id, l_wr_name, l_title, l_thum, l_view, l_like from lecture order by l_date desc limit 0, 10', cb);
  },
  getLectureWithPopularity(cb) {
    conn.query('select l_no, l_wr_id, l_wr_name, l_title, l_thum, l_view, l_like from lecture order by l_view desc limit 0, 10', cb);
  },
  getNumberofLectures(uid, cb) {
    conn.query('select u_lectures from user where u_id = ?', uid, cb);
  },
  getLectureById(uid, cb) {
    conn.query('select * from lecture where l_wr_id = ? order by l_date desc', uid, cb);
  },
  getLectureByNo(uid, lno, cb) {
    lno = lno * 1;
    conn.query('select * from lecture where l_wr_id = ? and l_no = ?', [uid, lno], cb);
  },
  getIsLiked(uno, lidx, cb) {
    uno = uno * 1;
    lidx = lidx * 1;
    conn.query('select * from like_history where u_no = ? and l_idx = ?', [uno, lidx], cb);
  },
  getIsSubscribed(wer_no, ing_no, cb) {
    conn.query('select s_idx from subscribe where s_follower_no = ? and s_following_no = ?', [wer_no, ing_no], cb)
  },
  getSubscribed(uid, cb) {
    conn.query('select u_no, u_follower from user where u_id = ?', uid, cb)
  },
  getLectureByCategory(cat, offset, cb) {
    conn.query('select count(l_idx) as cnt from lecture where left(l_category, 1) = ?', cat, (err, [result]) => {
      let cnt = result.cnt
      offset = (offset * 1 - 1) * 15
      conn.query('select * from lecture where left(l_category, 1) = ? order by l_date desc limit ?, 15', [cat, offset], (err, lecture) => {
        cb(err, cnt, lecture)
      })
    })
  },
  getMySubscribe(f_wer,cb) {
    conn.query('select ing.u_id, ing.u_name from user ing, user wer, subscribe s where wer.u_no = s.s_follower_no and ing.u_no = s.s_following_no and wer.u_no = ? limit 0, 7',f_wer, cb)
  },
  registerLecture(l_info, cb) {
    conn.query('alter table lecture auto_increment=1;', () => {
      conn.query('update user set u_lectures = u_lectures + 1 where u_id = ?', [l_info.wr_id], () => {
        conn.query('select c_level0, c_level1 from category where c_name = ?', l_info.category, (err, [result]) => {
          with(l_info){
            let cat_no = result.c_level0 + result.c_level1
            conn.query('insert into lecture(l_no, l_category, l_c_name, l_title, l_text, l_wr_id, l_wr_name, l_v_name, l_v_type, l_thum) value(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);',[no, cat_no, category, title, text, wr_id, wr_name, fileName, filetype, thumb], cb)
          }
        })
        
      })
    })
  },
  registerNote (uno, lidx, text, cb) {
    conn.query('insert into note(n_u_no, n_l_idx, n_text) values(?, ?, ?)', [uno, lidx, text], cb)
  },
  increaseView(uid, lno, cb){
    conn.query('update lecture set l_view = l_view + 1 where l_wr_id = ? and l_no = ?', [uid, lno], cb)
  },
  getNote(uno, lidx, cb) {
    conn.query('select n_text from note where n_u_no = ? and n_l_idx = ?', [uno, lidx], cb);
  },
  insertNote(notestr,timest) {
    conn.query('insert into note(n_ts,n_string) value(?,?)',[timest,notestr]);
  },
  searchLectureByTitle(searchStr, cb) {
    conn.query('select l_no, l_title, l_wr_id, l_wr_name, l_thum, l_view, l_like from lecture WHERE l_title REGEXP ?', searchStr, cb);
  },
  searchUserByName(searchStr, cb) {
    conn.query('select u_id, u_name, u_email, u_introduction, u_lectures, u_follower from user WHERE u_name REGEXP ?' ,searchStr,cb);
  },
  searchLecturePartitioning(cb) {
    conn.query('select * from category where c_level1 = 00',cb);
  },
  getAllCategory(cb) {
    conn.query('select * from category order by c_level0',cb)
  },
  handleLike(uno, wid, lno, cb) {
    conn.query('select l_idx from lecture where l_wr_id = ? and l_no = ?', [wid, lno], (err, rows) => {
      if(!err){
        conn.query('insert into like_history(u_no, l_idx) values(?, ?)', [uno, rows[0].l_idx], (err) => {
          if(!err){
            conn.query('update lecture set l_like = l_like + 1 where l_idx = ?', rows[0].l_idx)
            cb('T')
          }
          else{
            conn.query('delete from like_history where u_no = ? and l_idx = ?', [uno, rows[0].l_idx], () => {
              conn.query('update lecture set l_like = l_like - 1 where l_idx = ?', rows[0].l_idx)
              cb('F')
            })
          }
        })
      }
    }) 
  },
  handleSubscribe(f_wer, f_ing_id, cb) {
    conn.query('select u_no from user where u_id = ?', f_ing_id, (err, rows) => {
      let f_ing = rows[0].u_no
      if (f_ing === f_wer) {
        cb('S')
      } else {
        conn.query('insert into subscribe(s_follower_no, s_following_no) values(?, ?)', [f_wer, f_ing], (err) => {
          if(!err) {
            conn.query('update user set u_following = u_following + 1 where u_no = ?', f_wer)
            conn.query('update user set u_follower = u_follower + 1 where u_no = ?', f_ing)
            cb('T')
          }
          else {
            conn.query('delete from subscribe where s_follower_no = ? and s_following_no = ?', [f_wer, f_ing], (err) => {
              conn.query('update user set u_following = u_following - 1 where u_no = ?', f_wer)
              conn.query('update user set u_follower = u_follower - 1 where u_no = ?', f_ing)
              cb('F')
            })
          }
        })
      }
    })
  },
  deleteLecture (uid, lno, cb) {
    conn.query('delete from lecture where l_wr_id = ? and l_no = ?', [uid, lno], (err) => {
      conn.query('update user set u_lectures = u_lectures - 1 where u_id = ?', uid, cb)
    })
  }

}


module.exports = db;