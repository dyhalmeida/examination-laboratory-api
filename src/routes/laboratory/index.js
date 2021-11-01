const { Router } = require('express');
const laboratoryController = require('../../controller/laboratory');

const laboratory = new Router();

laboratory.post('/laboratory', laboratoryController.store);
laboratory.get('/laboratory', laboratoryController.index);

module.exports = laboratory;
