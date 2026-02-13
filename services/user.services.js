const User = require('../models/user.model');

const createUser = async (name, email) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User with this email already exists');
    }
    const user = await User.create({ name, email });
    return user;
};

const getUser = async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

const updateUser = async (userId, updateData) => {
    // Don't allow password update through this method
    delete updateData.password;
    
    const user = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
    ).select('-password');
    
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

const deleteUser = async (userId) => {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return "User deleted successfully";
};

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
};