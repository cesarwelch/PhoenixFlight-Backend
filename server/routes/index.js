const guestsController = require('../controllers').guest;


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Guest API!',
  }));

  app.post('/api/guest', guestsController.create);
  app.get('/api/guest', guestsController.list);
  app.get('/api/guest/:binaryId', guestsController.searchBinaryId);
  app.get('/api/updateIds', guestsController.updateIds);
};