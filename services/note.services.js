const Note = require('../models/note.model');

const createNote = async (userId, title, content) => {
    const note = await Note.create({
        userId,
        title,
        content
    });
    return note;
};

const getAllNotes = async (userId) => {
    const notes = await Note.find({
        userId,
        isDeleted: false,
        isArchived: false
    }).sort({ createdAt: -1 });
    return notes;
};

const getNoteById = async (noteId, userId) => {
    const note = await Note.findOne({
        _id: noteId,
        userId,
        isDeleted: false
    });
    if (!note) {
        throw new Error('Note not found');
    }
    return note;
};

const updateNote = async (noteId, userId, updateData) => {
    const note = await Note.findOneAndUpdate(
        {_id: noteId, userId, isDeleted: false},
        updateData,
        {new: true}
    );
    if (!note) {
        throw new Error('Note not found');
    }
    return note;
};

const softDeleteNote = async (noteId, userId) => {
    const note = await Note.findOneAndUpdate(
        { _id: noteId, userId, isDeleted: false },
        { isDeleted: true },
        { new: true }
    );
    if (!note) {
        throw new Error('Note not found');
    }
    return note;
};

const archiveNote = async (noteId, userId) => {
    const note = await Note.findOneAndUpdate(
        { _id: noteId, userId, isDeleted: false },
        { isArchived: true },
        { new: true }
    );
    if (!note) {
        throw new Error('Note not found');
    }
    return note;
};

const unarchiveNote = async (noteId, userId) => {
    const note = await Note.findOneAndUpdate(
        { _id: noteId, userId, isDeleted: false },
        { isArchived: false },
        { new: true }
    );
    if (!note) {
        throw new Error('Note not found');
    }
    return note;
};

const getArchivedNotes = async (userId) => {
    const notes = await Note.find({ 
        userId, 
        isArchived: true,
        isDeleted: false 
    }).sort({ createdAt: -1 });
    return notes;
};

const permanentDeleteNote = async (noteId, userId) => {
    const note = await Note.findOneAndDelete({ 
        _id: noteId, 
        userId 
    });
    if (!note) {
        throw new Error('Note not found');
    }
    return note;
};

module.exports = {
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    softDeleteNote,
    archiveNote,
    unarchiveNote,
    getArchivedNotes,
    permanentDeleteNote
}