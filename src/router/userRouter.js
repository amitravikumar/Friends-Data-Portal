const express = require("express");
const users = require("../database/model/userInfo");
const friends = require("../database/model/friendsList");
const { hash, compareHash } = require("../database/utils/hash");
const { sign } = require("../database/utils/jwtService");
const auth = require("../middlewares/auth");
const noauth = require("../middlewares/noauth");
const getUser = require("../dbQuery/getuser");
const getFriends = require("../dbQuery/getFriends");

const userRouter = express.Router();

userRouter.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const result = await getUser(email);
    if (result) {
      const isValidPassword = compareHash(password, result[0].password);
      if (isValidPassword) {
        const token = sign({
          sub: "user",
          email
        });
        response.cookie("jwt", token, { httpOnly: true });
        response.status(200).json({
          message: "Valid user!!"
        });
      } else {
        response.status(400).send("Invalid User");
      }
    } else {
      response.status(400).send("Invalid User");
    }
  } catch (e) {
    response.status(400).send(e);
  }
});

userRouter.post("/addfriends", auth, async (request, response) => {
  try {
    const { email } = request.jwt;
    const userData = await getUser(email);
    const { id } = userData[0];
    const result = await friends.create({ userid: id, ...request.body });
    if (result.get()) {
      response.status(200).send({
        message: "Friends added successfully!!"
      });
    } else {
      response.status(401).send({
        message: "Invalid Friend data!!"
      });
    }
  } catch (e) {
    response.status(401).send({
      message: "Invalid Friend data!!"
    });
  }
});

userRouter.put("/editfriends/:id", auth, async (request, response) => {
  try {
    const { id } = request.params;
    const data = JSON.parse(JSON.stringify(request.body));
    const result = await friends.update(data, { where: { id: id } });
    if (result) {
      response.status(200).send({
        message: "Friend Data updated successfully!!"
      });
    } else {
      response.status(200).send({
        message: "Invalid Friend Data!!"
      });
    }
  } catch (e) {
    response.status(200).send({
      message: e
    });
  }
});

userRouter.post("/adduser", noauth, async (request, response) => {
  try {
    let data = JSON.parse(JSON.stringify(request.body));
    console.log(data);
    data = { ...data, password: hash(data.password) };
    console.log(data);
    const result = await users.create(data);
    if (result) {
      response.status(200).send({
        message: "User has been added successfully!!"
      });
    } else {
      response.status(400).send({
        message: "Invalid User Data!!"
      });
    }
  } catch (e) {
    response.status(400).send({
      message: "Invalid User details"
    });
  }
});

userRouter.put("/edituser", auth, async (request, response) => {
  try {
    const { email } = request.jwt;
    const userData = await getUser(email);
    const { id } = userData[0];
    if (id) {
      const data = JSON.parse(JSON.stringify(request.body));
      const result = await users.update(data, { where: { id: id } });
      if (result) {
        response.status(200).send({
          message: "User Data updated successfully!!"
        });
      } else {
        response.status(400).send({
          message: "Invalid User Data!!"
        });
      }
    } else {
      response.status(400).send({
        message: "Invalid User Data!!"
      });
    }
  } catch (e) {
    response.status(400).send({
      message: "Invalid User details"
    });
  }
});

//delete friends data
userRouter.delete("/delete/:fid", auth, async (request, response) => {
  try {
    const { fid } = request.params;
    const { email } = request.jwt;
    const data = await getFriends(email);
    const friend = data.find((element) => element.id == fid);
    if (friend) {
      await friends.destroy({
        where: {
          id: fid
        }
      });
      response.status(200).send({
        message: "Friend has been removed"
      });
    } else {
      response.status(400).send({
        message: "Error in removing the friend"
      });
    }
  } catch (e) {
    response.redirect("/");
  }
});

module.exports = userRouter;
