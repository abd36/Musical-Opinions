const SecurityPrivacy = require('../models/securityPrivacyModel');

exports.create = (req, res) => {
    securityPrivacy = new SecurityPrivacy({
        security: req.body.security,
        privacy: req.body.privacy
    });
    
    securityPrivacy.save((err, policy) => {
        if (err) res.send({ error: err });
        else {
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
    SecurityPrivacy.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, policy) => {
        if (err) res.send({ error: err });
        else res.send(policy);
    });
};