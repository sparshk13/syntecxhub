const adminServices = require('../services/admin.services');

const getAllUsers = async (req, res) => {
    try {
        const users = await adminServices.getAllUsers();
        res.status(200).json({
            count: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await adminServices.getUserById(req.params.id);
        res.status(200).json({ user });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const blockUser = async (req, res) => {
    try {
        const user = await adminServices.blockUser(req.params.id);
        res.status(200).json({
            message: 'User blocked successfully',
            user
        });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const unblockUser = async (req, res) => {
    try {
        const user = await adminServices.unblockUser(req.params.id);
        res.status(200).json({
            message: 'User unblocked successfully',
            user
        });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const promoteToAdmin = async (req, res) => {
    try {
        const user = await adminServices.promoteToAdmin(req.params.id);
        res.status(200).json({
            message: 'User promoted to admin successfully',
            user
        });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const demoteToUser = async (req, res) => {
    try {
        const user = await adminServices.demoteToUser(req.params.id);
        res.status(200).json({
            message: 'User demoted to regular user successfully',
            user
        });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const result = await adminServices.deleteUser(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    blockUser,
    unblockUser,
    promoteToAdmin,
    demoteToUser,
    deleteUser
};
