const { verify } = require("../database/utils/jwtService");

const homeauth = (request, response, next) => {
  try {
    const payload = verify(request.cookies.jwt);
    if (payload) {
      request.jwt = payload;
      next();
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = homeauth;
