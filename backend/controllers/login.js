const { RENEW_TOKEN_TIME, ADMIN_LOGIN, ADMIN_PASS } = require('../config/config');

const generateToken = () => {
  return Math.random() + Date.now() + Math.random();
};

let token = generateToken();

setInterval(() => { 
  token = generateToken();
}, RENEW_TOKEN_TIME);

const loginUser = (req, res, logger, body) => {
  try {
    if (body.login === ADMIN_LOGIN && body.password === ADMIN_PASS) {
      res.setHeader('Set-Cookie', `loginToken=${token}; Secure; HttpOnly`);
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end();
    } else {
      res.writeHead(400);
      res.end();
    }
    logger.log(`connected: ${req.connection.remoteAddress}`);
  } catch (err) {
    res.writeHead(500);
    res.end('Something went wrong');
    logger.err(err);
  }
};

const checkLogin = (req, res, logger, body, cookies) => {
  try {
    if (cookies.loginToken && +cookies.loginToken === token) {
      res.writeHead(200);
      res.end('logined');
    } else {
      res.writeHead(400);
      res.end('no logined');
    }
  } catch (err) {
    res.writeHead(500);
    res.end('Something went wrong');
    logger.err(err);
  }
};

const isUserLogined = (cookies) => {
  console.log(cookies);
};

module.exports = { loginUser, isUserLogined, checkLogin };