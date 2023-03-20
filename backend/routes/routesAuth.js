const express = require('express');
const router = express.Router();

const controllersAuth = require('../controleurs/controleursAuth');

router.post('/signup', controllersAuth.signup);
router.post('/login', controllersAuth.login);

module.exports = router;