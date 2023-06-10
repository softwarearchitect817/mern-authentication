const axios = require('axios');
const { update } = require('../models/User');
const Users = require('../models/User');

exports.getGameLaunch = async (req, res, next) => {
  const { id, user } = req.body;
  const userData = await Users.findById(user);
  const data = {
    gameID: id,
    id: userData._id,
    name: userData.username,
    email: userData.email,
    balance: userData.balance,
    currency: "USD"
  }
  const response = await axios.post(`${process.env.PROVIDE_URL}/api/getGameLaunch`, data, {
    headers: {
      api: process.env.PROVIDE_URL_API
    }
  });
  res.send(response.data);
}

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
  const data = req.body.data;
  await Users.findById(data.player).updateOne({ 'balance': data.balance });
  res.status(200).send(true);
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
  };
  res.writeHead(200, { 'data': JSON.stringify(responseData) });
  res.end();
}

exports.getBalance = async (req, res) => {
  const userId = req.body.user;
  const response = await Users.findById(userId);
  res.send(response);
}