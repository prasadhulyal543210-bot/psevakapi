const express = require('express');
const router = express.Router();
const rationController = require('../controllers/mannual.controller');

router.post('/ration/submit', rationController.submitRation);
router.get('/ration/get-rations', rationController.getRationSubmissions);


module.exports = router;
