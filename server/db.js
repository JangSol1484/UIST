const mysql = require('mysql');
const dbconfig = require('./dbconfig.json');

const conn = mysql.createConnection(dbconfig);

conn.connect();

const db = {
  testapi (cb) {
    conn.query('select * from category order by c_level0', cb);
  },
  registerUser (userInfo, cb) {
    conn.query('alter table user auto_increment=1;', () => {
      with(userInfo){
        conn.query('insert into user(u_id, u_pw, u_name, u_email, u_introduction) value (?, ?, ?, ?, ?);',  [u_id,u_pw,u_name,u_email,u_intro], cb);
      }
    });
  },
  findUser (userInfo, cb) {//로그인 시
    conn.query('select u_no, u_name from user where u_id = ? and u_pw = ?;',  [userInfo.uid, userInfo.upw], cb);
  },
  findUserByNo(u_no, cb) {//요청 시 토큰의 id값으로 유저 인증
    u_no = u_no * 1;
    conn.query('select u_id, u_name, u_email, u_introduction, u_follower, u_lectures from user where u_no = ?', u_no, cb);//수정
  },
  updateUserProfile(userInfo, cb) {
    with(userInfo){
      conn.query('update user set u_name = ?, u_email = ?, u_introduction = ? where u_no = ?', [u_name, u_email, u_intro, u_no], cb);
    }
  },
  getLectureWithNewest(cb) {
    conn.query('select l_no, l_wr_id, l_wr_name, l_title, l_thum, l_view from lecture order by l_date desc limit 0, 5', cb);
  },
  getLectureWithPopularity(cb) {
    conn.query('select l_no, l_wr_id, l_wr_name, l_title, l_thum, l_view from lecture order by l_view desc limit 0, 5', cb);
  },
  getNumberofLectures(uid, cb) {
    conn.query('select u_lectures from user where u_id = ?', uid, cb);
  },
  getLectureById(uid, cb) {
    conn.query('select * from lecture where l_wr_id = ?', uid, cb);
  },
  getLectureByNo(uid, lno, cb) {
    lno = lno * 1;
    conn.query('select * from lecture where l_wr_id = ? and l_no = ?', [uid, lno], cb);
  },
  getLectureByCategory(cat, cb) {
    conn.query('select * from lecture where l_category = ?', cat, cb);
  },
  getMySubscribe(f_wer,cb) {
    conn.query('select ing.u_name from user ing, user wer, subscribe s where wer.u_no = s.s_follower_no and ing.u_no = s.s_following_no and wer.u_no = ?',f_wer, cb)
  },
  registerLecture(l_info, cb) {
    conn.query('alter table lecture auto_increment=1;', () => {
      conn.query('update user set u_lectures = u_lectures + 1 where u_id = ?', [l_info.wr_id], () => {
        with(l_info){
          conn.query('insert into lecture(l_no, l_category, l_title, l_text, l_wr_id, l_wr_name, l_v_name, l_v_type, l_thum) value(?, ?, ?, ?, ?, ?, ?, ?, ?);',[no, '900', title, text, wr_id, wr_name, fileName, filetype, thumb], cb);
        }
      })
    })
  },
  increaseView(uid, lno){
    conn.query('update lecture set l_view = l_view + 1 where l_wr_id = ? and l_no = ?', [uid, lno]);
  },
  getNote() {
    conn.query('select * from note;');
  },
  insertNote(notestr,timest) {
    conn.query('insert into note(n_ts,n_string) value(?,?)',[timest,notestr]);
  },
  searchLectureByTitle(searchStr, cb) {
    conn.query('select l_no, l_title, l_wr_id, l_wr_name, l_thum, l_view from lecture WHERE l_title REGEXP ?', searchStr, cb);
  },
  searchUserByName(searchStr, cb) {
    conn.query('select u_id, u_email, u_introduction, u_lectures, u_follower from user WHERE u_id REGEXP ?' ,searchStr,cb);
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
            cb(true)
          }
          else{
            conn.query('delete from like_history where u_no = ? and l_idx = ?', [uno, rows[0].l_idx], () => {
              conn.query('update lecture set l_like = l_like - 1 where l_idx = ?', rows[0].l_idx)
              cb(false)
            })
          }
        })
      }
    }) 
  },
  handleSubscribe(f_wer, f_ing_id, cb) {
    conn.query('select u_no from user where u_id = ?', f_ing_id, (err, rows) => {
      let f_ing = rows[0].u_no
      //console.log(f_ing_id, rows)

      conn.query('insert into subscribe(s_follower_no, s_following_no) values(?, ?)', [f_wer, f_ing], (err) => {
        if(!err) {
          conn.query('update user set u_following = u_following + 1 where u_no = ?', f_wer)
          conn.query('update user set u_follower = u_follower + 1 where u_no = ?', f_ing)
          cb(true)
        }
        else {
          conn.query('delete from subscribe where s_follower_no = ? and s_following_no = ?', [f_wer, f_ing], (err) => {
            conn.query('update user set u_following = u_following - 1 where u_no = ?', f_wer)
            conn.query('update user set u_follower = u_follower - 1 where u_no = ?', f_ing)
            cb(false)
          })
        }
      })
    })
  }
}

module.exports = db;