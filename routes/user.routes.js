const express = require('express');
const { authenticateToken } = require('../middlewares/auth.middleware');
const router = express.Router();

router.use(authenticateToken)
router.post('/create', require('../controllers/user.controller').createUser);
router.get('/get', require('../controllers/user.controller').getUser);
router.put('/update', require('../controllers/user.controller').updateUser);
router.delete('/delete', require('../controllers/user.controller').deleteUser);

module.exports = router;