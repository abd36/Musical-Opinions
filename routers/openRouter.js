const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const reviewController = require('../controllers/reviewController');
const userController = require('../controllers/userController');
const passport = require('passport')
const passportConfig = require('../Config/passport')

router.post('/user/login', passport.authenticate('local', {session: false, failureRedirect: "/open/user/login/error"}),  userController.login)

router.get('/user/login/error', userController.loginError);

router.post('/song/create', songController.createSong);

router.get('/song/top', songController.topTenSongs);

router.get('/review/:id', reviewController.getReview);

router.get('/review/most-recent/song/:id', reviewController.getMostRecentReviewForSong);

router.get('/review/song/:id', reviewController.getReviewsForSong);

router.get('/review/average-rating/song/:id', reviewController.getAverageRatingForSong);

module.exports = router;