const Router = require('express');
const router = new Router();
const specialisationController = require('../controller/specialisation.controller');

router.post('/specialisation', specialisationController.createSpecialisation);

router.get('/specialisation', specialisationController.getSpecialisations);

router.get('/specialisation/:id', specialisationController.getOneSpecialisation);

router.put('/specialisation', specialisationController.updateSpecialisation);

router.delete('/specialisation/:id', specialisationController.deleteSpecialisation);

module.exports = router;
