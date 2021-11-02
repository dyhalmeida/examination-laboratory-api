const { Router } = require('express');
const examController = require('../../controller/exam');

/** Import validations */
const storeExamValidation = require('../../validators/exam/StoreExamValidator');
const StoreAllExamValidator = require('../../validators/exam/StoreAllExamValidator');
const deleteAllExamValidator = require('../../validators/exam/DeleteAllExamValidator');
const updateAllExamValidator = require('../../validators/exam/UpdateAllExamValidator');
const updateExamValidator = require('../../validators/exam/UpdateExamValidator');

const exam = new Router();

exam.post('/exam', storeExamValidation, examController.store);
exam.post('/exams', StoreAllExamValidator, examController.storeAll);

exam.get('/exam', examController.index);

exam.delete('/exam/:id', examController.delete);
exam.delete('/exams', deleteAllExamValidator, examController.deleteAll);

exam.put('/exam/:id', updateExamValidator, examController.update);
exam.put('/exams', updateAllExamValidator, examController.updateAll);

module.exports = exam;
