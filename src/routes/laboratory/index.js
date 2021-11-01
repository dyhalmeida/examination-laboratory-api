const { Router } = require('express');
const laboratoryController = require('../../controller/laboratory');

const laboratory = new Router();

laboratory.post('/laboratory', laboratoryController.store);
laboratory.post('/laboratories', laboratoryController.storeAll);
laboratory.get('/laboratory', laboratoryController.index);
laboratory.delete('/laboratory/:id', laboratoryController.delete);
laboratory.put('/laboratory/:id', laboratoryController.update);

module.exports = laboratory;
