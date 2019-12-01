const Review = require('../models/reviewModel');
const Song = require('../models/songModel');

exports.createReview = function(req, res) {
	let songId = req.body.songId;
	let review = new Review({
		rating: req.body.rating,
		comment: req.body.comment,
		songId: req.body.songId,
		userEmail: req.body.userEmail,
	});

	review.save(function(reviewErr, review) {
		if (reviewErr) {
			res.send("can't save review - " + reviewErr);
		}
		else {
			Song.findOne({_id: songId}, function(songErr, song) {
				if (songErr) {
					res.send("can't find song - " + songErr);
				}
				else {
					song.numberOfRatings =  song.numberOfRatings + 1;
					song.sumOfRatings = song.sumOfRatings + parseInt(req.body.rating);
					song.averageRating = song.sumOfRatings/song.numberOfRatings;

					song.save(function(songErr2){
						if (songErr2) {
							res.send("can't save updated song - " + songErr2);
						}
						else {
							res.send(review);
						}
					})
				}
			})
		}
	});
}

exports.getMostRecentReviewForSong = function(req, res){
	Review.findOne({songId: req.params.id}, {}, {sort: { $natural : -1 }}, function(err, review) {
		if (err) {
			res.send("can't find review - " + err);
		}
		else {
			res.send(review);
		}
	});
}

exports.getReviewsForSong = function(req, res){
	Review.find({songId: req.params.id}, {}, {sort: { 'created_at' : 1 }}, function(err, reviews){
		if (err) {
			res.send("can't find reviews - " + err);
		}
		else {
			res.send(reviews);
		}
	});
}