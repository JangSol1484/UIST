<<<<<<< HEAD
const mysql = require('mysql');
const dbconfig = require('./dbconfig.json');

const conn = mysql.createConnection(dbconfig);

conn.connect();
=======
const mysql = require('mysql2/promise');
const dbconfig = require('./dbconfig.json');

const pool = mysql.createPool(dbconfig);
>>>>>>> parent of dc9f030... 서버안정화 로그인 개선

const db = {
  registerUser (userInfo) {
    conn.query('alter table user auto_increment=1;', () => {
      with(userInfo){
        conn.query('insert into user value (null, ?, ?, ?, ?, ?);',  [u_id,u_pw,u_name,u_email,u_intro]);
      }
    });
  },
  async findUser (uid, upw) {//로그인 시
    const connection = await pool.getConnection(async conn => conn);
    const [rows] = await connection.query('select u_no from user where u_id = ? and u_pw = ?;',  [uid, upw]);
    return rows;
  },
  async findUserByNo(u_no) {//요청 시 토큰의 id값으로 유저 인증
    const connection = await pool.getConnection(async conn => conn);
    u_no = u_no * 1;
    const [rows] = await connection.query('select u_name from user where u_no = ?', u_no);
    return rows[0].u_name;
  },
  async getLectureWithNewest() {
    const connection = await pool.getConnection(async conn => conn);
    const [lecture] = await connection.query('select l_no, l_wr, l_title, l_thum, l_view from lecture order by l_date desc limit 0, 5');

    return lecture;
  },
  async getLectureWithPopularity() {
    const connection = await pool.getConnection(async conn => conn);
    const [lecture] = await connection.query('select l_no, l_wr, l_title, l_thum, l_view from lecture order by l_view desc limit 0, 5');

    return lecture;
  },
  async findLecture(uid, lno) {
    lno = lno * 1;
    const connection = await pool.getConnection(async conn => conn);
    const lecture = connection.query('select * from lecture where l_wr = ? and l_no = ?', [uid, lno]);

    return await lecture;
  },
  async registerLecture(title, text, writer, fileName, filetype, thum) {
    
    const connection = await pool.getConnection(async conn => conn);
    try{
      await connection.query('alter table lecture auto_increment=1;');
      await connection.query('insert into lecture(l_title, l_text, l_wr, l_v_name, l_v_type, l_thum) value(?, ?, ?, ?, ? ,?);',[title, text, writer, fileName, filetype, thum]);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }

  },
  async increaseView(uid, lno){

    const connection = await pool.getConnection(async conn => conn);
    await connection.query('update lecture set l_view = l_view + 1 where l_wr = ? and l_no = ?', [uid, lno]);
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