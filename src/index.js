const express = require("express");
const path = require("path");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressHBS = require("express-handlebars");
const getFriends = require("./dbQuery/getFriends");
const getUser = require("./dbQuery/getuser");
const userRouter = require("./router/userRouter");
const auth = require("./middlewares/auth");
const noauth = require("./middlewares/noauth");
const passiveauth = require("./middlewares/passiveauth");
const homeauth = require("./middlewares/homeauth");
const ifEquality = require("./views/helpers/ifEquality");
const idCheck = require("./views/helpers/idCheck");
const app = express();

const hbs = expressHBS.create({
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "./views/layouts"),
  partialsDir: path.join(__dirname, "./views/partials"),
  helpers: {
    ifEquality,
    idCheck
  }
});

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "./views"));

app.use("/images", express.static(path.join(__dirname, "./images")));

app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use("/user", userRouter);

app.get("/", homeauth, (request, response) => {
  response.status(200).render("homes.hbs", {
    layout: "hero.hbs",
    title: "Home",
    isUser: request.jwt ? request.jwt.sub === "user" : false
  });
});

app.get("/login", passiveauth, (request, response) => {
  response.status(200).render("login.hbs", {
    layout: "main.hbs",
    title: "Home",
    action: "/user/login",
    method: "POST"
  });
});

app.get("/adduser", noauth, async (request, response) => {
  response.status(200).render("editUsers.hbs", {
    layout: "navigation.hbs",
    title: "Add Users",
    action: "/user/adduser",
    method: "POST"
  });
});

app.get("/edituser", auth, async (request, response) => {
  const { email } = request.jwt;
  const user = await getUser(email);
  console.log(user);
  response.status(200).render("editUsers.hbs", {
    layout: "navigation.hbs",
    title: "edit Users",
    action: "/user/edituser",
    method: "PUT",
    data: user[0]
  });
});

app.get("/friends", auth, async (request, response) => {
  const { email } = request.jwt;
  const data = await getFriends(email);
  response.status(200).render("friendsList.hbs", {
    layout: "navigation.hbs",
    title: "friends",
    data: data
  });
});

app.get("/addfriends", auth, async (request, response) => {
  response.status(200).render("editFriends.hbs", {
    layout: "navigation.hbs",
    title: "friends",
    action: "/user/addfriends",
    method: "POST"
  });
});

app.get("/editfriends/:fid", auth, async (request, response) => {
  try {
    const { fid } = request.params;
    const { email } = request.jwt;
    const data = await getFriends(email);
    const friend = data.find((element) => element.id == fid);
    if (friend) {
      response.status(200).render("editFriends.hbs", {
        layout: "navigation.hbs",
        title: "friends",
        action: `/user/editfriends/${fid}`,
        method: "PUT",
        data: friend
      });
    } else {
      response.redirect("/friends");
    }
  } catch (e) {
    response.redirect("/");
  }
});

app.get("/logout", (request, response) => {
  response.clearCookie("jwt");
  response.redirect("/login");
});

app.get("*", (req, res) => {
  res.status(404).send("<h1> 404,Page Not Found </h1>");
});

app.listen(8000, () => {
  console.log("Server is up and running");
});
