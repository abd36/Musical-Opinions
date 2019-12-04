const SecurityPrivacy = require('../models/securityPrivacyModel');

exports.create = (req, res) => {
    //create new model with json in the request
    securityPrivacy = new SecurityPrivacy({
        security: req.body.security,
        privacy: req.body.privacy
    });
    //save the new model
    securityPrivacy.save((err, policy) => {
        if (err) res.send({ error: err });
        else {
            //delete the old policy
            SecurityPrivacy.deleteOne({}, { sort: { createdAt: -1 } }, (err) => {
                if (err) res.send({ error: err });
                else res.send(policy);
            });
        };
    });
}

exports.get = (req, res) => {
    SecurityPrivacy.findOne({}, (err, policy) => {
        if (err) res.send({ error: err });
        else res.send(policy)
    });
}

exports.update = (req, res) => {
    //pass in policy id which was in the url to find the policy
    SecurityPrivacy.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, policy) => {
        if (err) res.send({ error: err });
        else res.send(policy);
    });
};