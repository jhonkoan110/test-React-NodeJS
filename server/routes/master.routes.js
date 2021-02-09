const Router = require('express');
const router = new Router();
const masterController = require('../controller/master.controller');

router.post('/master', masterController.createMaster);

router.get('/master', masterController.getMasters);

// router.get('/master/:id', masterController.getOneMaster);

router.get('/master', masterController.getMastersBySpecialisation);

router.delete('/master/:id', masterController.deleteMaster);

module.exports = router;
