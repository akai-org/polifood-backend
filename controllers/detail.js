const { error, success } = require('./index')
const db = require('../models')

exports.findDetail = (req, res) => {
    try {
        if (!req.body.id) throw "ID";
    } catch (err) {
        return error.invalidInput(req, res, `${err} field missing!`);
    }
    const { id } = req.body
    db.Pin.find({ _id: id }).populate('details').select('details')
        .then(details => {
            res.status(200).json({
                status: 'success',
                message: null,
                data: details[0].details
            })
        })
        .catch(err => error.serverError(req, res, err))
}

exports.updateDetail = (req, res) => {
    error.notImplemented(req, res)
}