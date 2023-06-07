const axios = require('axios');

exports.getPrivateData = async (req, res, next) => {
  const response = await axios.get(`${process.env.PROVIDE_URL}/get/game-list`);
  res.send(response.data);
};


exports.playGame = async (req, res, next) => {
  const response = await axios.get(req.body.url);
  console.log("response===>", response);
  res.send("response.data");
};

exports.updateBalance = async (req, res) => {
  res.writeHead(200);
  res.end();
}

exports.getUserData = async (req, res) => {
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