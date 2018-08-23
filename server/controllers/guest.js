const Guest = require('../models').Guest;
var md5 = require('md5');
var _ = require('lodash');
const sequelize = require('sequelize');

module.exports = {
    create(req, res) {
        return Guest.create({
            name: req.body.name,
            email: req.body.email,
            response: req.body.response,
            plusone: req.body.plusone,
            plusonelist: req.body.plusonelist
        }).then(guest => res.status(201).send(guest)).catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Guest.all().then(guests => res.status(200).send(guests)).catch(error => {console.log(error); res.status(400).send(error);});
    },
    updateGuestList(req, res) {
        console.log("lolol")
        return Guest.update(
            {plusonelist: req.body.plusonelist},
            {where: sequelize.where(sequelize.fn('MD5', sequelize.cast(sequelize.col("id"), 'text')), req.body.id)}
            ).then(guest => res.status(204).send(guest)).catch(error => res.status(400).send(error));
    },
    updateIds(req, res) {
        return Guest.all().then(guests => {
            for (var i = 0; i < guests.length; i++) {
                guests[i].dataValues.binaryId = md5(guests[i].dataValues.id.toString());
            }
            res.status(200).send(guests);
        }).catch(error => res.status(400).send(error));
    },
    searchBinaryId(req, res) {
        Guest.findAll({
            where: sequelize.where(sequelize.fn('MD5', sequelize.cast(sequelize.col("id"), 'text')), req.params.binaryId)
        }).then(guests => res.status(200).send(guests)).catch(error => res.status(400).send(error));
    }
};
