const express = require('express');
const router = express.Router();
const passport = require('passport');
const songController = require('../controllers/songController');
const reviewController = require('../controllers/reviewController');
const userController = require('../controllers/userController');
const dmcaTakeDownController = require('../controllers/dmcaTakeDownController');
const securityPrivacyController = require('../controllers/securityPrivacyController');
const logController = require('../controllers/logController');

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
router.get('/song/allButHidden', songController.allButHidden);

//dmca takedown routes
router.post('/dmcaTakeDown/create', dmcaTakeDownController.create);
router.get('/dmcaTakeDown', dmcaTakeDownController.get);
router.post('/dmcaTakeDown/update/:id', dmcaTakeDownController.update);

//privacy policy routes
router.post('/securityPrivacy/create', securityPrivacyController.create);
router.get('/securityPrivacy', securityPrivacyController.get);
router.post('/securityPrivacy/update/:id', securityPrivacyController.update);

//log routes
router.post('/log/create', logController.create)
router.get('/log', logController.getAll)

module.exports = router;