const express = require('express');
const router = express.Router();
const {
    getPrivateData,
    playGame,
    getUserData,
    updateBalance,
    getGameLaunch
} = require('../controllers/private');
const { protect } = require('../middleware/auth');

// router.route('/').get(protect, getPrivateData);
router.post('/playGame', playGame);
router.post('/getUserData', getUserData);
router.post('/updateBalance', updateBalance);
router.post('/getGameLaunch', getGameLaunch);

module.exports = router;
