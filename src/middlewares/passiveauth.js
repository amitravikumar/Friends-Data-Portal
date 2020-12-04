const { verify } = require("../database/utils/jwtService");

const passiveauth = (request, response, next) => {
  try {
    const payload = verify(request.cookies.jwt);
    if (payload) {
      request.jwt = payload;
      response.redirect("/friends");
    } else {
      next();
    }
  } catch (e) {
    console.log("hi");
  }
};

module.exports = passiveauth;
