const { verify } = require("../database/utils/jwtService");

const noauth = (request, response, next) => {
  try {
    const payload = verify(request.cookies.jwt);
    if (payload) {
      response.redirect("/login");
    } else {
      next();
    }
  } catch (e) {
    console.log(e);
  }
};

module.exports = noauth;
