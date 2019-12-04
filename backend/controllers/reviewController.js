const Review = require('../models/reviewModel');
const Song = require('../models/songModel');

//create func
exports.createReview = function(req, res) {
	let songId = req.body.songId;
	//create a new model with json in the request
	let review = new Review({
		rating: req.body.rating,
		comment: req.body.comment,
		songId: req.body.songId,
		userEmail: req.body.userEmail,
	});
	//save the new model
	review.save(function(reviewErr, review) {
		if (reviewErr) {
			res.send({ error: reviewErr });
		}
		else {
			//get the song the review is for
			Song.findOne({_id: songId}, function(songErr, song) {
				if (songErr) {
					res.send({ error: songErr });
				}
				else {
					//update review related information in the song
					song.numberOfRatings =  song.numberOfRatings + 1;
					song.sumOfRatings = song.sumOfRatings + parseInt(req.body.rating);
					song.averageRating = song.sumOfRatings/song.numberOfRatings;
					//save the song
					song.save(function(songErr2){
						if (songErr2) {
							res.send({ error: songErr2 });
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
	//use sort option to get the most recent review
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
	//pass in song id to filter reviews
	//and sort by time of creation
	Review.find({songId: req.params.id}, {}, {sort: { 'created_at' : 1 }}, function(err, reviews){
		if (err) {
			res.send("can't find reviews - " + err);
		}
		else {
			res.send(reviews);
		}
	});
}