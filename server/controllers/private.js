const axios = require('axios');
const Users = require('../models/User');

exports.getPrivateData = async (req, res, next) => {
  const response = await axios.get(`${process.env.PROVIDE_URL}/get/game-list`);
  res.send(response.data);
};


exports.playGame = async (req, res, next) => {
  const { name, id, opid } = req.body;
  try {
    const response = await axios.get(`/api/${name}?gameID=${id}&opid=${opid}`, {
      headers: {
        api: 'BopzRkUUsX5j0wkN1f7RLM9Zj'
      }
    });
    res.send(response.data);
  }
  catch (error) {
    console.log("err====>", error);
  }
};

exports.updateBalance = async (req, res) => {
  res.writeHead(200);
  res.end();
}

exports.getUserData = async (req, res, next) => {
  const userId = req.body.opid;
  console.log("userId====>", userId);
  const userInfo = await Users.findById(userId);
  console.log("userinfo----->", userInfo);
  const responseData = {
    userId: userId,
    balanceId: Date.now(),
    balance: 10000,
    currency: Date.now(),
    name: userInfo.username,
    email: userInfo.email
  };
  console.log("getuserdata=====>", responseData);
  res.writeHead(200, { 'data': JSON.stringify(responseData) });
  res.end();
}