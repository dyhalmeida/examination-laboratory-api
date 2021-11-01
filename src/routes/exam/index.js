const { Router } = require('express');
const examController = require('../../controller/exam');

const exam = new Router();

exam.post('/exam', examController.store);

exam.get('/exam', examController.index);

module.exports = exam;
