const { Router } = require('express');
const laboratoryController = require('../../controller/laboratory');

/** Import validations */
const storeLaboratoryValidator = require('../../validators/laboratory/StoreLaboratoryValidator');
const storeAllLaboratoryValidator = require('../../validators/laboratory/StoreAllLaboratoryValidator');
const updateAllLaboratoryValidator = require('../../validators/laboratory/UpdateAllLaboratoryValidator');
const updateLaboratoryValidator = require('../../validators/laboratory/UpdateLaboratoryValidator');
const deleteAllLaboratoryValidator = require('../../validators/laboratory/DeleteAllLaboratoryValidator');
const associateLaboratoryValidator = require('../../validators/laboratory/AssociateLaboratoryValidator');

const laboratory = new Router();

laboratory.post('/laboratory', storeLaboratoryValidator, laboratoryController.store);
laboratory.post('/laboratories', storeAllLaboratoryValidator, laboratoryController.storeAll);

laboratory.get('/laboratory', laboratoryController.index);

laboratory.delete('/laboratory/:laboratoryID/exam/:examID', laboratoryController.disassociate);
laboratory.post('/laboratory/:laboratoryID/exam', associateLaboratoryValidator, laboratoryController.associate);
laboratory.delete('/laboratory/:id', laboratoryController.delete);
laboratory.delete('/laboratories', deleteAllLaboratoryValidator, laboratoryController.deleteAll);

laboratory.put('/laboratory/:id', updateLaboratoryValidator, laboratoryController.update);
laboratory.put('/laboratories', updateAllLaboratoryValidator, laboratoryController.updateAll);

module.exports = laboratory;
