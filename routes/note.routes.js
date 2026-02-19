const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');
const { authenticateToken } = require('../middlewares/auth.middleware');

router.use(authenticateToken);

// Specific routes first (before :id routes)
router.post('/create', noteController.createNote);
router.get('/all', noteController.getAllNotes);
router.get('/archived/all', noteController.getArchivedNotes);

// Archive operations
router.put('/:id/archive', noteController.archiveNote);
router.put('/:id/unarchive', noteController.unarchiveNote);

// Permanent delete
router.delete('/:id/permanent', noteController.permanentDeleteNote);

// Dynamic :id routes last
router.get('/:id', noteController.getNoteById);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;
