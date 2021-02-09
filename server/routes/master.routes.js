const Router = require('express');
const router = new Router();
const masterController = require('../controller/master.controller');

router.post('/master', masterController.createMaster);

router.get('/master', masterController.getMasters);

router.get('/master', masterController.getMastersBySpecialisation);

router.put('/master', masterController.updateMaster);

router.delete('/master/:id', masterController.deleteMaster);

module.exports = router;
