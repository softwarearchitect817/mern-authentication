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
