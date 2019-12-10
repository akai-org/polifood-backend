exports.serverError = (req, res, err) => res.status(500).json({status: 'error', message: err, data: null})

exports.alreadyExists = (req, res) => res.status(406).json({status: 'error', message: 'Already Exists', data: null})

exports.invalidInput = (req, res, message) => res.status(406).json({status: 'error', message: message, data: null})

exports.notFound = (req, res) => res.status(404).json({status: 'error', message: 'Not Found', data: null})

exports.invalidURL = (req, res) => res.status(400).json({status: 'error', message: 'Invalid URL', data: null})

exports.notImplemented = (req, res) => res.status(500).json({status: 'error', message: 'Not Implemented Yet', data: null})