const DMCATakeDown = require('../models/dmcaTakeDownModel');

exports.create = (req, res) => {
    console.log(req.body);
    dmcaTakeDown = new DMCATakeDown({
        dmca: req.body.dmca,
        takeDown: req.body.takeDown
    });
    
    dmcaTakeDown.save((err, policy) => {
        if (err) res.send({ error: err });
        else {
            DMCATakeDown.deleteOne({}, { sort: { createdAt: -1 } }, (err) => {
                if (err) res.send({ error: err });
                else res.send(policy);
            });
        };
    });
}

exports.get = (req, res) => {
    DMCATakeDown.findOne({}, (err, policy) => {
        if (err) res.send({ error: err });
        else res.send(policy)
    });
}

exports.update = (req, res) => {
    DMCATakeDown.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, policy) => {
        if (err) res.send({ error: err });
        else res.send(policy);
    });
};