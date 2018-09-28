const Guest = require('../models').Guest;
var md5 = require('md5');
var _ = require('lodash');
const sequelize = require('sequelize');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const Op = sequelize.Op;
const fs = require('fs');
module.exports = {
    create(req, res) {
        return Guest.create({
            name: req.body.name,
            email: req.body.email,
            response: req.body.response,
            plusone: req.body.plusone,
            plusonelist: req.body.plusonelist,
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
    updateGuest(req, res) {
        return Guest.update({
            plusone: req.body.plusonelist,
            name: req.body.name,
            email: req.body.email
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
            plusonelist: '{}',
            response: false
        }, {
            where: {
                "id": req.body.id
            }
        }).then(guest => {
            res.status(200).send(guest)
        }).catch(error => res.status(400).send(error));
    },
    resetGuest(req, res){
        return Guest.update({
            response: null,
            plusonelist: '{}',
        }, {
            where: {
                "id": req.body.id
            }
        }).then(guest => {
            res.status(200).send(guest)
        }).catch(error => res.status(400).send(error));
    },
    searchBinaryId(req, res) {
        Guest.findAll({
            where: sequelize.where(sequelize.fn('MD5', sequelize.cast(sequelize.col("id"), 'text')), req.params.binaryId)
        }).then(guests => res.status(200).send(guests)).catch(error => res.status(400).send(error));
    },
    getPdf(req, res) {
        var tempFile = "./server/assets/printable" + req.params.plusone + ".pdf";
        fs.readFile(tempFile, function(err, data) {
            if (err) {
                res.status(400).send(err)
            } else {
                res.status(200)
                res.contentType("application/pdf");
                res.send(data);
            }
        })
    },
    filteredList(req, res) {
        Guest.findAll({
            order: [
                ['id', 'ASC'],
            ],
            attributes: ['id', 'name', 'response', 'plusone', 'email', 'plusonelist', 'invitationsent', [sequelize.fn("concat", "www.fernandezcanowedding.com/guest/", sequelize.fn('MD5', sequelize.cast(sequelize.col("id"), 'text'))), 'url']]
        }).then(guests => res.status(200).send(guests)).catch(error => res.status(400).send(error));
    },
    sendemail(req, res) {
        Guest.findAll({
            where: {
                id: {
                    [Op.gte]: req.body.index,
                    [Op.lte]: req.body.offset
                }
            },
            attributes: [
                [sequelize.fn('MD5', sequelize.cast(sequelize.col("id"), 'text')), 'id'], 'name', 'email', 'plusone', 'invitationsent'
            ]
        }).then(guests => {
            let msg = [];
            for (var i = 0; i < guests.length; i++) {
                msg.push({
                    to: guests[i].email,
                    from: 'Invitacion@fernandezcanowedding.com',
                    subject: 'Boda Fernández-Cano',
                    text: 'Invitacion',
                    html: '<div class="container" style="position: relative;text-align: center;color: gray;"><a class="bottom-right" href="http://www.fernandezcanowedding.com/guest/' + guests[i].id + '" style="position: absolute;top: 32%;right: 11%;font-family: Playball,cursive;color: white;">        <img src="https://res.cloudinary.com/fernandez-cano/image/upload/v1536912680/test.gif" style="width:100%;">        </img>    </a>    <div style="font-weight:bold; color: gray;">' + guests[i].name + '</div><div style="position: relative;text-align: center;color: gray;">Se han reservado para usted ' + guests[i].plusone + ' espacios</div><h5 style="font-weight: normal;">(Hemos creado una invitación única para usted. Porfavor no comparta este email con nadie mas.)</h5></div>'
                })
                console.log(guests[i].dataValues)
            }
            sgMail.send(msg).then(() => {
                Guest.update({
                    invitationsent: true
                }, {
                    where: {
                        id: {
                            [Op.gte]: req.body.index,
                            [Op.lte]: req.body.offset
                        }
                    }
                }).then(guest => {
                    return res.status(200).send({
                        "sended": guests
                    })
                }).catch(error => res.status(400).send(error));
            }).catch(error => {
                //Log friendly error
                console.error(error.toString());
                //Extract error msg
                const {
                    message,
                    code,
                    response
                } = error;
                //Extract response msg
                const {
                    headers,
                    body
                } = response;
                return res.status(400).send(error)
            })
        }).catch(error => res.status(400).send(error));
    }
}