const jwt = require('jsonwebtoken');
const secret = 'token secret';//암호화 키값
const expiresIn = 60 * 60 * 6; //로그인 정보가 유효한 시간 60mins

const auth = {
  signToken (id) {
    return jwt.sign({id}, secret, {expiresIn});
  },
  ensureAuth () {
    return (req, res, next) => {
      const {authorization} = req.headers;
      if(!authorization){
        res.status(401);
        throw Error('No Authorization headers');
      }

      try {
        req.user = this.verify(authorization);
      } catch (e) {
        res.status(401);
        throw e;
      }

      next()
    }
  },
  verify (token) {
    return jwt.verify(token.replace(/^Bearer\s/, ''), secret);
  }
}

module.exports = auth;