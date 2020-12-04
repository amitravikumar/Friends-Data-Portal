const friendsList = require("../model/friendsList");

const { hash } = require("bcrypt");

const one = [
  {
    friendFirstName: "Bala",
    friendLastName: "Murugan",
    age: 23,
    gender: "Male",
    email: "bala@gmail.com",
    phoneno: "123456789"
  },
  {
    friendFirstName: "Karthi",
    friendLastName: "Krishnan",
    age: 23,
    gender: "Male",
    email: "karthi@gmail.com",
    phoneno: "234567891"
  }
];

const two = [
  {
    friendFirstName: "Amarnath",
    friendLastName: "K",
    age: 23,
    gender: "Male",
    email: "amarnath@gmail.com",
    phoneno: "345678912"
  },
  {
    friendFirstName: "Vignesh",
    friendLastName: "B",
    age: 23,
    gender: "Male",
    email: "vignesh@gmail.com",
    phoneno: "456789123"
  }
];

const friendsSeeder = async (userid) => {
  const friendsData = userid == 1 ? one : two;
  try {
    friendsData.forEach(async (element) => {
      const result = await friendsList.create({ userid, ...element });
      console.log(result.get());
    });
  } catch (e) {
    console.error(e);
  }
};

module.exports = friendsSeeder;
