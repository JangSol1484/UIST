const mysql2 = require('mysql2/promise');
const mysql = require('mysql');
const dbconfig = require('./dbconfig.json');

const pool = mysql2.createPool(dbconfig);
const conn = mysql.createConnection({
  hostname: "localhost:3306",
  user: 'root',
  password: '1111',
  database: 'uist',
  charset: 'utf8'
})

conn.connect();

const db = {
  async registerUser (userInfo) {
    const connection = await pool.getConnection(async conn => conn);
    try{
      await connection.query('alter table user auto_increment=1;');
      await connection.query('insert into user value (null, ?, ?, ?, ?, ?);',  [userInfo.u_id,userInfo.u_pw,userInfo.u_name,userInfo.u_email,userInfo.u_intro]);
      return true;
    } catch (e) {
      return false;
    }
  },
  findUser (userInfo, cb) {//로그인 시
    conn.query('select u_no, u_name from user where u_id = ? and u_pw = ?;',  [userInfo.uid, userInfo.upw], cb);
  },
  findUserByNo(u_no, cb) {//요청 시 토큰의 id값으로 유저 인증
    u_no = u_no * 1;
    conn.query('select u_name from user where u_no = ?', u_no, cb);
  },
  getLectureWithNewest(cb) {
    conn.query('select l_no, l_wr, l_title, l_thum, l_view from lecture order by l_date desc limit 0, 5', cb);
  },
  getLectureWithPopularity(cb) {
    conn.query('select l_no, l_wr, l_title, l_thum, l_view from lecture order by l_view desc limit 0, 5', cb);
  },
  findLecture(uid, lno, cb) {
    lno = lno * 1;
    conn.query('select * from lecture where l_wr = ? and l_no = ?', [uid, lno], cb);
  },
  registerLecture(l_info, cb) {
    conn.query('alter table lecture auto_increment=1;', () => {
      with(l_info){
        conn.query('insert into lecture(l_title, l_text, l_wr, l_v_name, l_v_type, l_thum) value(?, ?, ?, ?, ? ,?);',[title, text, writer, fileName, filetype, thumb], cb);
      }
    })
  },
  increaseView(uid, lno){
    conn.query('update lecture set l_view = l_view + 1 where l_wr = ? and l_no = ?', [uid, lno]);
  }
  /*,
  findAccessLog ({userId}) {
    return Promise.resolve()
      .then(() => _db.logs.filter(l => l.userId === userId))
  },
  createAccessLog ({userId}) {
    return Promise.resolve()
      .then(() => _db.logs.push({userId, createdAt: new Date}))
  }*/
}

module.exports = db;