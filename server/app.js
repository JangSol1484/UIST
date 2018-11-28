const express = require('express');//서버 라우팅 관리
const path = require('path');//url path join
//var favicon = require('serve-favicon');
const logger = require('morgan');
const cors = require('cors');//spa에서 다중 요청 처리 가능하게 함
const cookieParser = require('cookie-parser');//쿠키 파싱
const bodyParser = require('body-parser');//바디 파싱 -> post 요청 처리 가능하게 함
const compression = require('compression');

let app = express();

const index = require('./routes/index');
const user = require('./routes/user');
const lecture = require('./routes/lecture');
const note = require('./routes/note');
const contents = require('./routes/contents');
const search = require('./routes/search');
const discovery = require('./routes/discovery');

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(compression());//gzip 압축
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//vue spa 전달
app.use(express.static(path.join(__dirname, 'contents')));//업로드 경로

//express 라우트 세팅
app.use('/', index); //SPA 전달
app.use('/api/user', user); //user 정보를 처리하는 api
app.use('/api/lecture', lecture); //강의 정보를 처리하는 api
app.use('/api/note', note); //필기 정보를 처리하는 api
app.use('/api/contents', contents); //멀티미디어 컨텐츠와 api
app.use('/api/search', search); //디비정보 검색 결과를 출력하는 api
app.use('/api/discovery', discovery);
app.use(require('connect-history-api-fallback')());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send the error
  res.status(err.status || 500);
  res.send('http status 500 error');
});

module.exports = app;
