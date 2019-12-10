const { error, success } = require("./index");
const db = require("../models");

exports.findFilters = (req, res) => {
  db.Filter.find()
    .then(foundData =>
      res.status(200).json({
        status: "success",
        message: null,
        data: foundData.map(found => ({
          id: found._id,
          name: found.name
        }))
      })
    )
    .catch(err => error.serverError(req, res, err));
};

exports.createFilter = (req, res) => {
  try {
    if (!req.body.name) throw "Name";
  } catch (err) {
    return error.invalidInput(req, res, `${ err } field missing!`);
  }
  const name = { name: req.body.name };
  db.Filter.countDocuments(name)
    .then(count => {
      if (count) error.alreadyExists(req, res);
      else {
        db.Filter.create(name)
          .then(created =>
            res.status(200).json({
              status: "success",
              message: "Created",
              data: {
                id: created._id,
                name: created.name
              }
            })
          )
          .catch(err => error.serverError(req, res, err));
      }
    })
    .catch(err => error.serverError(req, res, err));
};

exports.deleteFilter = (req, res) => {
  try {
    if (!req.body.id) throw "Id";
  } catch (err) {
    return error.invalidInput(req, res, `${err} field missing!`);
  }
  const id = { _id: req.body.id };
  db.Filter.countDocuments(id)
    .then(count => {
      if (count) {
        db.Filter.deleteOne(id)
          .then(() => success.deleted(req, res))
          .catch(err => error.serverError(req, res, err));
      } else error.notFound(req, res);
    })
    .catch(err => error.serverError(req, res, err));
};

exports.updateFilter = (req, res) => {
  try {
    if (!req.body.id) throw "Id";
    if (!req.body.name) throw "Name";
  } catch (err) {
    return error.invalidInput(req, res, `${err} field missing!`);
  }
  const id = { _id: req.body.id };
  const change = { name: req.body.name };
  db.Filter.updateOne(id, change)
    .then(() => success.updated(req, res))
    .catch(err => error.serverError(req, res, err));
};
