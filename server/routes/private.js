const express = require('express');
const router = express.Router();
const {
    getPrivateData,
    playGame,
    getUserData,
    updateBalance
} = require('../controllers/private');
const { protect } = require('../middleware/auth');

// router.route('/').get(protect, getPrivateData);
router.post('/playGame', playGame);
router.post('/getUserData', getUserData);
router.post('/updateBalance', updateBalance);

module.exports = router;
