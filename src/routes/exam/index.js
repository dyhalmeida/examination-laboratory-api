const { Router } = require('express');
const examController = require('../../controller/exam');

/** Import validations */
const storeExamValidation = require('../../validators/exam/StoreExamValidator');
const StoreAllExamValidator = require('../../validators/exam/StoreAllExamValidator');

const exam = new Router();

exam.post('/exam', storeExamValidation, examController.store);
exam.post('/exams', StoreAllExamValidator, examController.storeAll);

exam.get('/exam', examController.index);

exam.delete('/exam/:id', examController.delete);
exam.delete('/exams', examController.deleteAll);

exam.put('/exam/:id', examController.update);
exam.put('/exams', examController.updateAll);

module.exports = exam;
