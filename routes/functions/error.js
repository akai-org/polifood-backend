module.exports.serverError = (req, res, err) => res.status(500).json({status: 'error', message: err, data: null})

module.exports.alreadyExists = (req, res) => res.status(406).json({status: 'error', message: 'Already Exists', data: null})

module.exports.notFound = (req, res) => res.status(404).json({status: 'error', message: 'Not Found', data: null})

module.exports.invalidURL = (req, res) => res.status(400).json({status: 'error', message: 'Invalid URL', data: null})

module.exports.notImplemented = (req, res) => res.status(500).json({status: 'error', message: 'Not Implemented Yet', data: null})