const axios = require('axios');
const Users = require('../models/User');

exports.getPrivateData = async (req, res, next) => {
  const response = await axios.get(`${process.env.PROVIDE_URL}/get/game-list`);
  res.send(response.data);
};


exports.playGame = async (req, res, next) => {
  const { name, id, opid } = req.body;
  console.log("name====>", name, id, opid);
  const response = await axios.get(`https://vegasbets.site/api/${name}?gameID=${id}&opid=${opid}`, {
    headers: {
      api: 'BopzRkUUsX5j0wkN1f7RLM9Zj'
    }
  });
  console.log("response===>", response);
  res.send("response.data");
};

exports.updateBalance = async (req, res) => {
  res.writeHead(200);
  res.end();
}

exports.getUserData = async (req, res, next) => {
  const userId = req.body.opid;
  const userInfo = await Users.findById(userId);
  const responseData = {
    userId: userId,
    balanceId: Date.now(),
    balance: 10000,
    currency: Date.now(),
    name: userInfo.username,
    email: userInfo.email
  }
  res.writeHead(200, { 'data': JSON.stringify(responseData) });
  res.end();
}