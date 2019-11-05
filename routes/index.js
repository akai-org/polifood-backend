const express = require('express')
const router = express.Router()
const db = require('../models')

router.route('/categories')
.get((req, res) => {
  db.Filter.find()
  .then(foundData => res.status(200).json({status: 'success', message: null, data: foundData.map(found => ({id: found._id, name: found.name}))}))
  .catch(err => res.status(500).json({status: 'error', message: err, data: null}))
})
.post((req, res) => {
  const input = req.body
  db.Filter.countDocuments(input)
      .then(count => {
        if(count) {
          res.status(406).json({status: 'error', message: 'Already Exist', data: null})
        } else {
          db.Filter.create(input)
          .then(created => res.status(200).json({status: 'success', message: 'Created', data: {id: created._id, name: created.name}}))
          .catch(err => res.status(500).json({status: 'error', message: err, data: null}))
        }
      })
      .catch(err => res.status(500).json({status: 'error', message: err, data: null}))
})
.delete((req, res) => {
  const input = {_id: req.body.id}
  db.Filter.countDocuments(input)
  .then(count => {
    if(count) {
      db.Filter.deleteOne(input)
      .then(() => res.status(200).json({status: 'success', message: 'Deleted', data: null}))
      .catch(err => res.status(500).json({status: 'error', message: err, data: null}))
    } else {
      res.status(406).json({status: 'error', message: 'Not Found', data: null})
    }
  })
  .catch(err => res.status(500).json({status: 'error', message: err, data: null}))
})
.put((req, res) => {
  const id = {_id: req.body.id}
  const change = {name: req.body.name}
  db.Filter.updateOne(id, change)
  .then(() => res.status(200).json({status: 'success', message: 'Updated', data: null}))
  .catch(err => res.status(500).json({status: 'error', message: err, data: null}))
})


router.route('/markers')
.get((req, res) => {
    const { location, distance, filters } = req.body
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
    if (filters.length) query.filters = {$in: filters}
    db.Pin.find(query).populate('filters').populate('details').exec()
    .then(foundData => res.status(200).json({
        status: 'success',
        message: null,
        data: foundData.map(found => ({
            id: found._id,
            name: found.name,
            images: found.images,
            address: found.address,
            location: found.location.coordinates,
            categories: found.filters.map(filter => ({id: filter._id, name: filter.name}))
        }))
    }))
    .catch(err => res.status(500).json({status: 'error', message: err, data: null}))
})
.post((req, res) => {
    const newPinDetails = {
        description: req.body.details.description,
        menu: req.body.details.menu,
        hours: req.body.details.hours,
        comments: req.body.details.comments
    }
    db.Detail.create(newPinDetails)
    .then(createdDetail => {
        const newPin = {
            name: req.body.name,
            images: req.body.images,
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
                        menu: createdDetail.menu,
                        hours: createdDetail.hours,
                        comments: createdDetail.comments
                    }
                }
            })
        })
        .catch(err => res.status(500).json({status: 'error', message: err, data: null}))
    })
    .catch(err => res.status(500).json({status: 'error', message: err, data: null}))
})
.put((req, res) => {
    const id = { _id: req.body.id }
    let change = {}
    for (let val in req.body) change[val] = req.body[val]
    if(change.location) change.location = {coordinates: change.location}
    if(change.filters) {change.categories = change.filters; change.filters = undefined}
    if(change.id) {change.id = undefined}
    db.Pin.updateOne(id, change, { new: true })
    .then(updated => res.status(200).json({status: 'success', message: 'Updated', data: null}))
    .catch(err => res.status(500).json({status: 'error', message: err, data: null}))
})
// router.route('/details')

// router.route('/menu-items')

// router.route('/comments')



module.exports = router
