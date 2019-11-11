const { error, success } = require('./')
const db = require('../../models')

module.exports.findPins = (req, res) => {
    const { location, distance, categories } = req.body
    let query = {
        location: {
            $near: {
                $maxDistance: distance,
                $geometry: {
                    type: "Point",
                    coordinates: location
                }
            }
        }
    }
    if (categories.length) query.filters = {$in: categories}
    db.Pin.find(query).populate('filters').populate('details').exec()
    .then(foundData => res.status(200).json({
        status: 'success',
        message: null,
        data: foundData.map(found => ({
            id: found._id,
            name: found.name,
            address: found.address,
            location: found.location.coordinates,
            categories: found.filters.map(filter => ({id: filter._id, name: filter.name}))
        }))
    }))
    .catch(err => error.serverError(req, res, err))
}

module.exports.createPin = (req, res) => {
    const newPinDetails = {
        description: req.body.details.description,
        images: req.body.images,
        menu: req.body.details.menu,
        hours: req.body.details.hours,
        comments: []
    }
    db.Detail.create(newPinDetails)
    .then(createdDetail => {
        const newPin = {
            name: req.body.name,
            address: req.body.address,
            location: {
                coordinates: req.body.location
            },
            filters: req.body.categories,
            details: createdDetail._id
        }
        db.Pin.create(newPin)
        .then(createdPin => {
            res.status(200).json({
                status: 'success',
                message: 'Created',
                data: {
                    id: createdPin._id,
                    images: createdPin.images,
                    address: createdPin.address,
                    location: createdPin.location.coordinates,
                    categories: createdPin.filters.map(obj => obj._id),
                    details: {
                        description: createdDetail.description,
                        images: createdDetail.images,
                        menu: createdDetail.menu,
                        hours: createdDetail.hours,
                        comments: createdDetail.comments
                    }
                }
            })
        })
        .catch(err => error.serverError(req, res, err))
    })
    .catch(err => error.serverError(req, res, err))
}

module.exports.updatePin = (req, res) => {
    // Change required ===
    const id = { _id: req.body.id }
    let change = {}
    for (let val in req.body) change[val] = req.body[val]
    if(change.location) change.location = {coordinates: change.location}
    if(change.filters) {change.categories = change.filters; change.filters = undefined}
    if(change.id) {change.id = undefined}
    // ===

    db.Pin.updateOne(id, change)
    .then(() => success.updated(req, res))
    .catch(err => error.serverError(req, res, err))
}

module.exports.deletePin = (req, res) => {
    error.notImplemented(req, res)
}