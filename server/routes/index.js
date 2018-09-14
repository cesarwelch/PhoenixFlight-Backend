const guestsController = require('../controllers').guest;


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Guest API!',
  }));

  app.post('/api/guest', guestsController.create);
  app.get('/api/guest', guestsController.list);
  app.put('/api/guest/updateGuestList', guestsController.updateGuestList);
  app.put('/api/guest/denyResponse', guestsController.denyResponse);
  app.get('/api/guest/:binaryId', guestsController.searchBinaryId);
  app.get('/api/pdf/:plusone', guestsController.getPdf)
  app.post('/api/sendemail', guestsController.sendemail);
};