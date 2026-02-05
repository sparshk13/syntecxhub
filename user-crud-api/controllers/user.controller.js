const userServices = require('../services/user.services');

const createUser = async (req, res) => {
    const { name, email } = req.body;
    try {
        if (!name || !email) {
            throw new Error('Name and Email are required');
        }

        const user = await userServices.createUser(name, email);
        res.status(201).json(user);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }}

const getUser = async (req, res) => {
    const {email} = req.body;
    try {
        if (!email) {
            throw new Error('Email is required');
    }
    const user = await userServices.getUser(email);
    res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }}

const updateUser = async (req, res) => {
    const {email, updateData} = req.body;
    try {
        if (!email) {
            throw new Error('Email is required');
    }
    const user = await userServices.updateUser(email, updateData);
    res.status(200).json(user);
}
    catch (error) {
        res.status(400).json({ error: error.message });
    }}

const deleteUser = async (req, res) => {
    const {email} = req.body;
    try {
        if (!email) {
            throw new Error('Email is required');
    }
    await userServices.deleteUser(email);
    res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}