const { error, success } = require("./index");
const db = require("../models");

exports.findPins = (req, res) => {
  try {
    if (!req.body.location) throw "Location";
    if (!req.body.distance) throw "Distance";
    if (!req.body.categories) throw "Categories";
  } catch (err) {
    return error.invalidInput(req, res, `${err} field missing!`);
  }
  const { location, distance, categories } = req.body;
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
  };
  if (categories.length) query.filters = { $in: categories };
  db.Pin.find(query)
    .populate("filters")
    .populate("details")
    .exec()
    .then(foundData =>
      res.status(200).json({
        status: "success",
        message: null,
        data: foundData.map(found => ({
          id: found._id,
          name: found.name,
          address: found.address,
          location: found.location.coordinates,
          categories: found.filters.map(filter => ({
            id: filter._id,
            name: filter.name
          }))
        }))
      })
    )
    .catch(err => error.serverError(req, res, err));
};

exports.createPin = (req, res) => {
  try {
    if (!req.body.name) throw "Name";
    if (!req.body.address) throw "Address";
    if (!req.body.address.street) throw "Address-Street";
    if (!req.body.address.number) throw "Address-Number";
    if (!req.body.location) throw "Location";
    if (!req.body.categories) throw "Categories";
    if (!req.body.details) throw "Details";
    if (!req.body.details.description) throw "Details-Description";
    if (!req.body.details.images) throw "Details-Images";
    if (!req.body.details.menu) throw "Details-Menu";
    if (!req.body.details.hours) throw "Details-Hours";
    for (const el of ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']){
      if (!req.body.details.hours[el]) throw `Details-Hours-${el.charAt(0).toUpperCase() + el.slice(1)}`;
      if (!req.body.details.hours[el].from) throw `Details-Hours-${el.charAt(0).toUpperCase() + el.slice(1)}-From`;
      if (!req.body.details.hours[el].to) throw `Details-Hours-${el.charAt(0).toUpperCase() + el.slice(1)}-To`;
    }
  } catch (err) {
    return error.invalidInput(req, res, `${err} field missing!`);
  }
  const newPinDetails = {
    description: req.body.details.description,
    images: req.body.images,
    menu: req.body.details.menu,
    hours: req.body.details.hours,
    comments: []
  };
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
      };
      db.Pin.create(newPin)
        .then(createdPin => {
          res.status(200).json({
            status: "success",
            message: "Created",
            data: {
              id: createdPin._id,
              name: createdPin.name,
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
          });
        })
        .catch(err => error.serverError(req, res, err));
    })
    .catch(err => error.serverError(req, res, err));
};

exports.updatePin = (req, res) => {
  try {
    if (!req.body.id) throw "Id";
  } catch (err) {
    return error.invalidInput(req, res, `${err} field missing!`);
  }
  const id = { _id: req.body.id };
  let change = {};
  ["name", "address", "location", "categories"].forEach(val => {
    if (req.body[val]) change[val] = req.body[val];
  });
  if (change.location) change.location = { coordinates: change.location };
  if (change.filters) {
    change.categories = change.filters;
    change.filters = undefined;
  }

  db.Pin.updateOne(id, change)
    .then(() => success.updated(req, res))
    .catch(err => error.serverError(req, res, err));
};

exports.deletePin = (req, res) => {
  try {
    if (!req.body.id) throw "Id";
  } catch (err) {
    return error.invalidInput(req, res, `${err} field missing!`);
  }
  const id = { _id: req.body.id };
  db.Pin.find(id)
    .then(foundPin => {
      db.Detail.deleteOne({ _id: foundPin[0].details })
        .then(() => db.Pin.deleteOne(id))
        .then(() => success.deleted(req, res))
        .catch(err => error.serverError(req, res, err));
    })
    .catch(err => error.serverError(req, res, err));
};
