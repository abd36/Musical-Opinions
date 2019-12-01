const express = require('express');
const router = express.Router();
const songController = require('../controllers/songController');
const reviewController = require('../controllers/reviewController');
const userController = require('../controllers/userController');
const passport = require('passport')
// const security = require('../security/security')

//user routes
router.post('/user/create', userController.createUser);
router.put('/user/login', passport.authenticate('local', {session: false, failureRedirect: "login/error"}),  userController.login);
router.get('/user/login/error', userController.loginError);

//song routes
router.get('/song/top', songController.topTenSongs);
router.get('/review/most-recent/song/:id', reviewController.getMostRecentReviewForSong);
router.get('/review/song/:id', reviewController.getReviewsForSong);

module.exports = router;