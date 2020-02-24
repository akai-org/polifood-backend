const express = require('express')
const router = express.Router()
const { error, filter, pin, detail, menuItem, comment } = require('../controllers')

router.route('/categories')
.get(filter.findFilters)
.post(filter.createFilter)
.delete(filter.deleteFilter)
.put(filter.updateFilter)


router.route('/markers')
.get(pin.findPins)
.post(pin.createPin)
.delete(pin.deletePin)
.put(pin.updatePin)

router.route('/details')
.get(detail.findDetail)
.put(detail.updateDetail) // To be implemented

router.route('/menu-items')
.get(menuItem.findMenuItems) // To be implemented
.post(menuItem.createMenuItems) // To be implemented
.delete(menuItem.deleteMenuItem) // To be implemented
.put(menuItem.updateMenuItem) // To be implemented

router.route('/comments')
.get(comment.findComments) // To be implemented
.post(comment.createComment) // To be implemented
.delete(comment.deleteComment) // To be implemented
.put(comment.updateComment) // To be implemented

router.route('*')
.all(error.invalidURL)

module.exports = router
