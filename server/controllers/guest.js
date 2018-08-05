const Guest = require('../models').guest;
var md5 = require('md5');
module.exports = {
    create(req, res) {
        return Guest.create({
            name: req.body.name,
            email: req.body.email,
            plusone: req.body.plusone,
            plusonelist: req.body.plusonelist,
            binaryId: req.body.binaryId
        }).then(guest => res.status(201).send(guest)).catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Guest.all().then(guests => res.status(200).send(guests)).catch(error => res.status(400).send(error));
    },
    updateIds(req, res) {
        return Guest.all().then(guests => {
            for (var i = 0; i < guests.length; i++) {
                guests[i].dataValues.binaryId = md5(guests[i].dataValues.id);
            }
            res.status(200).send(guests);
        }).catch(error => res.status(400).send(error));
    }
};