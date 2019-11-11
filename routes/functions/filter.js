const { error, success } = require('./')
const db = require('../../models')

module.exports.findFilters = (req, res) => {
    db.Filter.find()
    .then(foundData => res.status(200).json({
        status: 'success',
        message: null,
        data: foundData.map(found => ({
            id: found._id,
            name: found.name
        }))
    }))
    .catch(err => error.serverError(req, res, err))
}

module.exports.createFilter = (req, res) => {
    const data = req.body
    db.Filter.countDocuments(data)
    .then(count => {
        if(count) error.alreadyExists(req, res)
        else {
            db.Filter.create(data)
            .then(created => res.status(200).json({
                status: 'success',
                message: 'Created',
                data: {
                    id: created._id,
                    name: created.name
                }
            }))
            .catch(err => error.serverError(req, res, err))
        }
    })
    .catch(err => error.serverError(req, res, err))
}

module.exports.deleteFilter = (req, res) => {
    const id = { _id: req.body.id }
    db.Filter.countDocuments(id)
    .then(count => {
        if(count) {
            db.Filter.deleteOne(id)
            .then(() => success.deleted(req, res))
            .catch(err => error.serverError(req, res, err))
        } else error.notFound(req, res)
    })
    .catch(err => error.serverError(req, res, err))
}

module.exports.updateFilter = (req, res) => {
    const id = {_id: req.body.id}
    const change = {name: req.body.name}
    db.Filter.updateOne(id, change)
    .then(() => success.updated(req, res))
    .catch(err => error.serverError(req, res, err))
}