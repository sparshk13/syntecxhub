const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authenticateToken, authorizeRoles } = require('../middlewares/auth.middleware');

// All routes require authentication and admin role
router.use(authenticateToken);
router.use(authorizeRoles('admin'));

// User management
router.get('/users', adminController.getAllUsers);
router.get('/users/:id', adminController.getUserById);
router.put('/users/:id/block', adminController.blockUser);
router.put('/users/:id/unblock', adminController.unblockUser);
router.put('/users/:id/promote', adminController.promoteToAdmin);
router.put('/users/:id/demote', adminController.demoteToUser);
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;
