const User = require('../models/user.model');
const mongoose = require('mongoose');

const createUser = async (name, email) => {
    // Check if user with this email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User with this email already exists');
    }

    const user = await User.create({ name, email });
    return user;
}

const getUser = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

const updateUser = async (email, updateData) => {
    const user = await User.findOneAndUpdate(
        { email }, 
        updateData, 
        { new: true }
    );
    if (!user) {
        throw new Error('User not found');
    }
    return user;
}

const deleteUser = async (email) => {
    const user = await User.findOneAndDelete({ email });
    if (!user) {
        throw new Error('User not found');
    }
    return "User deleted successfully";
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}