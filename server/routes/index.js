const guestsController = require('../controllers').guest;


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Guest API!',
  }));

  app.post('/api/guest', guestsController.create);
  app.get('/api/guest', guestsController.list);
  app.get('/api/filteredList', guestsController.filteredList);
  app.put('/api/guest/updateGuestList', guestsController.updateGuestList);
  app.put('/api/guest/update', guestsController.updateGuest);
  app.put('/api/guest/denyResponse', guestsController.denyResponse);
  app.put('/api/guest/resetGuest', guestsController.resetGuest);
  app.get('/api/guest/:binaryId', guestsController.searchBinaryId);
  app.get('/api/pdf/:plusone', guestsController.getPdf)
  app.post('/api/sendemail', guestsController.sendemail);
  app.post('/api/sendsandwichs', guestsController.sendsandwichs);
};