const Guest = require('../models').Guest;
var md5 = require('md5');
var _ = require('lodash');
const sequelize = require('sequelize');

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'FernandezCanoWedding@gmail.com',
    pass: 'canofernandez123'
  }
});

module.exports = {
    create(req, res) {
        return Guest.create({
            name: req.body.name,
            email: req.body.email,
            response: req.body.response,
            plusone: req.body.plusone,
            plusonelist: req.body.plusonelist
            invitationsent: req.body.invitationsent
        }).then(guest => res.status(201).send(guest)).catch(error => res.status(400).send(error));
    },
    list(req, res) {
        return Guest.all().then(guests => res.status(200).send(guests)).catch(error => res.status(400).send(error));
    },
    updateGuestList(req, res) {
        return Guest.update({
            plusonelist: JSON.stringify(req.body.plusonelist),
            response: true
        }, {
            where: {
                "id": req.body.id
            }
        }).then(guest => {
            res.status(200).send(guest)
        }).catch(error => res.status(400).send(error));
    },
    denyResponse(req, res) {
        return Guest.update({
            plusonelist: '[]',
            response: false
        }, {
            where: {
                "id": req.body.id
            }
        }).then(guest => {
            console.log(guest)
            res.status(200).send(guest)
        }).catch(error => res.status(400).send(error));
    },
    searchBinaryId(req, res) {
        Guest.findAll({
            where: sequelize.where(sequelize.fn('MD5', sequelize.cast(sequelize.col("id"), 'text')), req.params.binaryId)
        }).then(guests => res.status(200).send(guests)).catch(error => res.status(400).send(error));
    },
    sendemail(req, res) {
        var mailOptions = {
            from: 'FernandezCanoWedding@gmail.com',
            to: 'FernandezCanoWedding100@sharklasers.com',
            subject: 'Sending Email using Node.js',
            text: 'That was easy!'
        };
        console.log('FernandezCanoWedding100@sharklasers.com')
        transporter.sendMail(mailOptions, function(error, info) {
            console.log("lolol")
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

    }
};