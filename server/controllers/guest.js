const Guest = require('../models').Guest;

module.exports = {
  create(req, res) {
    return Guest
      .create({
        name: req.body.name,
        email: req.body.email,
        language: req.body.language,
        plus_one: req.body.plus_one
      })
      .then(guest => res.status(201).send(guest))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
  return Guest
    .all()
    .then(guests => res.status(200).send(guests))
    .catch(error => res.status(400).send(error));
  },
};