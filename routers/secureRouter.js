const express = require('express');
const router = express.Router();
const passport = require('passport');
const songController = require('../controllers/songController');
const reviewController = require('../controllers/reviewController');
const userController = require('../controllers/userController');

//review routes
router.post('/review/create', reviewController.createReview);

//user routes
router.post('/user/admin/:id', userController.toggleAdmin);
router.post('/user/active/:id', userController.toggleActive);

//song routes
router.post('/song/create', songController.createSong);
router.post('/song/hide/:id', songController.toggleHide);
router.get('/song/copyright', songController.toggleCopyRight);

module.exports = router;