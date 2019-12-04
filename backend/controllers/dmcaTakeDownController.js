const DMCATakeDown = require('../models/dmcaTakeDownModel');

//create function
exports.create = (req, res) => {
    //create new model with variable that was passed in
    dmcaTakeDown = new DMCATakeDown({
        dmca: req.body.dmca,
        takeDown: req.body.takeDown
    });
    //save the new model
    dmcaTakeDown.save((err, policy) => {
        if (err) res.send({ error: err });
        else {
            //delete the old policy
            DMCATakeDown.deleteOne({}, { sort: { createdAt: -1 } }, (err) => {
                if (err) res.send({ error: err });
                else res.send(policy);
            });
        };
    });
}

//get the policy
exports.get = (req, res) => {
    DMCATakeDown.findOne({}, (err, policy) => {
        if (err) res.send({ error: err });
        else res.send(policy)
    });
}

//update the policy
exports.update = (req, res) => {
    DMCATakeDown.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, policy) => {
        if (err) res.send({ error: err });
        else res.send(policy);
    });
};