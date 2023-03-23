/*creation des routes pour les likes/dislikes*/

const express = require('express');
const router = express.Router();
const controllers = require('../controleurs/saucesCtlLike');


router.post('/:id/like', controllers.createLike);