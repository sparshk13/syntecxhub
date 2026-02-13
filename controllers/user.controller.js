const userServices = require('../services/user.services');

const createUser = async (req, res) => {
    try {
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Name and Email are required' });
        }

        const user = await userServices.createUser(name, email);
        res.status(201).json(user);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        // Get user ID from JWT token (set by auth middleware)
        const user = await userServices.getUser(req.user.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const updateData = req.body;
        
        // Get user ID from JWT token
        const user = await userServices.updateUser(req.user.id, updateData);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        // Get user ID from JWT token
        await userServices.deleteUser(req.user.id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
};