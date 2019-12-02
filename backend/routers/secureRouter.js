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
router.get('/user/all', userController.all);

//song routes
router.post('/song/create', songController.create);
router.post('/song/hidden/:id', songController.toggleHide);
router.post('/song/copyright/:id', songController.toggleCopyRight);
router.get('/song/all', songController.all);

module.exports = router;