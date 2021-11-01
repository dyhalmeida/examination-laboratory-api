const { Router } = require('express');
const examController = require('../../controller/exam');

const exam = new Router();

exam.post('/exam', examController.store);
exam.post('/exams', examController.storeAll);

exam.get('/exam', examController.index);

exam.delete('/exam/:id', examController.delete);
exam.delete('/exams', examController.deleteAll);

exam.put('/exam/:id', examController.update);
exam.put('/exams', examController.updateAll);

module.exports = exam;
