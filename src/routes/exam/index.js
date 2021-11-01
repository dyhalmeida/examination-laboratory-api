const { Router } = require('express');
const examController = require('../../controller/exam');

const exam = new Router();

exam.post('/exam', examController.store);

exam.get('/exam', examController.index);

exam.delete('/exam/:id', examController.delete);

exam.put('/exam/:id', examController.update);

module.exports = exam;
