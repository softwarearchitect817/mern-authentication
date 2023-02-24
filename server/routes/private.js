const express = require('express');
const router = express.Router();
const {
    getPrivateData,
    playGame
} = require('../controllers/private');
const { protect } = require('../middleware/auth');

router.route('/').get(protect, getPrivateData);
router.post('/playGame', playGame);

module.exports = router;
