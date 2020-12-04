const { verify } = require("../database/utils/jwtService");

const auth = (request, response, next) => {
  try {
    const payload = verify(request.cookies.jwt);
    if (payload) {
      request.jwt = payload;
      next();
    } else {
      response.redirect("/login");
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = auth;
