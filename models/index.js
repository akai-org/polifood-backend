const mongoose = require('mongoose')
mongoose.Promise = Promise

module.exports.Pin = require('./pin')
module.exports.Detail = require('./detail')
module.exports.Filter = require('./filter')
module.exports.MenuItem = require('./menuitem')
module.exports.Comment = require('./comment')
