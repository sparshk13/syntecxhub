const noteServices = require('../services/note.services');

const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ error: 'Title and content are required' });
        }

        const note = await noteServices.createNote(req.user.id, title, content);
        res.status(201).json({
            message: 'Note created successfully',
            note
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllNotes = async (req, res) => {
    try {
        const notes = await noteServices.getAllNotes(req.user.id);
        res.status(200).json({
            count: notes.length,
            notes
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getNoteById = async (req, res) => {
    try {
        const note = await noteServices.getNoteById(req.params.id, req.user.id);
        res.status(200).json({ note });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updateData = {};

        if (title) updateData.title = title;
        if (content) updateData.content = content;

        const note = await noteServices.updateNote(req.params.id, req.user.id, updateData);
        res.status(200).json({
            message: 'Note updated successfully',
            note
        });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const deleteNote = async (req, res) => {
    try {
        await noteServices.softDeleteNote(req.params.id, req.user.id);
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const archiveNote = async (req, res) => {
    try {
        const note = await noteServices.archiveNote(req.params.id, req.user.id);
        res.status(200).json({
            message: 'Note archived successfully',
            note
        });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const unarchiveNote = async (req, res) => {
    try {
        const note = await noteServices.unarchiveNote(req.params.id, req.user.id);
        res.status(200).json({
            message: 'Note unarchived successfully',
            note
        });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const getArchivedNotes = async (req, res) => {
    try {
        const notes = await noteServices.getArchivedNotes(req.user.id);
        res.status(200).json({
            count: notes.length,
            notes
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const permanentDeleteNote = async (req, res) => {
    try {
        await noteServices.permanentDeleteNote(req.params.id, req.user.id);
        res.status(200).json({ message: 'Note permanently deleted' });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote,
    archiveNote,
    unarchiveNote,
    getArchivedNotes,
    permanentDeleteNote
};
