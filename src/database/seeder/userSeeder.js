const userInfo = require("../model/userInfo");
const friendsList = require("../model/friendsList");
const friendsSeeder = require("./friendsSeeder");
const { hash } = require("../utils/hash");

const userData = [
  {
    firstName: "Sathesh",
    lastName: "Narayanan",
    age: 23,
    gender: "Male",
    email: "sathesh@gmail.com",
    password: hash("testing")
  },
  {
    firstName: "Moses",
    lastName: "Stephen",
    age: 23,
    gender: "Male",
    email: "moses@gmail.com",
    password: hash("testing")
  }
];

const userSeeder = async () => {
  await userInfo.sync({ force: true });
  await friendsList.sync({ force: true });

  try {
    userData.forEach(async (element) => {
      const result = await userInfo.create(element);
      const { id } = result.get();
      friendsSeeder(id);
    });
  } catch (e) {
    console.error(e);
  }
};

userSeeder();
