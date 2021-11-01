const { Router } = require('express');
const laboratoryController = require('../../controller/laboratory');

const laboratory = new Router();

laboratory.post('/laboratory', laboratoryController.store);
laboratory.post('/laboratories', laboratoryController.storeAll);

laboratory.get('/laboratory', laboratoryController.index);

laboratory.delete('/laboratory/:laboratoryID/exam/:examID', laboratoryController.disassociate);
laboratory.post('/laboratory/:laboratoryID/exam', laboratoryController.associate);
laboratory.delete('/laboratory/:id', laboratoryController.delete);
laboratory.delete('/laboratories', laboratoryController.deleteAll);

laboratory.put('/laboratory/:id', laboratoryController.update);
laboratory.put('/laboratories', laboratoryController.updateAll);

module.exports = laboratory;
