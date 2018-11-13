const mysql = require('mysql2/promise');
const dbconfig = require('./dbconfig.json');

const pool = mysql.createPool(dbconfig);

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
  async findUser (uid, upw) {
    const connection = await pool.getConnection(async conn => conn);
    const [rows] = await connection.query('select * from user where u_id = ? and u_pw = ?;',  [uid, upw]);
    return rows;
  },
  async findUserByNo(u_no) {
    const connection = await pool.getConnection(async conn => conn);
    u_no = u_no * 1;
    const [rows] = await connection.query('select u_name from user where u_no = ?', u_no);
    return rows[0].u_name;
  },
  async findLectureAll() {
    const connection = await pool.getConnection(async conn => conn);
    const [lecture] = await connection.query('select l_no, l_wr, l_title, l_thum, l_view from lecture');

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
  },

  async getnote(){
    const conneciton = await pool.getConnection(async conn => conn);
    await connection.query('select * from note;');
  },
  async insertnote(str,time_st){
    const conneciton = await pool.getConnection(async conn => conn);
    await connection.qurey('alter table note auto_increment=1;')
    await connection.query('insert into note(n_string,n_ts) value(?,?)', [str,time_st]);
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