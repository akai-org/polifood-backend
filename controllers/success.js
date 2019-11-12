exports.updated = (req, res) => res.status(200).json({status: 'success', message: 'Updated', data: null})

exports.deleted = (req, res) => res.status(200).json({status: 'success', message: 'Deleted', data: null})