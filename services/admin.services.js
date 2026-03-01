const User = require('../models/user.model');

const getAllUsers = async () => {
    const users = await User.find()
        .select('-password')
        .sort({ createdAt: -1 });
    return users;
};

const getUserById = async (userId) => {
    const user = await User.findById(userId).select('-password');
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};

const blockUser = async (userId) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { isBlocked: true },
        { new: true }
    ).select('-password');

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

const unblockUser = async (userId) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { isBlocked: false },
        { new: true }
    ).select('-password');

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

const promoteToAdmin = async (userId) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { role: 'admin' },
        { new: true }
    ).select('-password');

    if (!user) {
        throw new Error('User not found');
    }

    return user;
};

const demoteToUser = async (userId) => {
    const user = await User.findByIdAndUpdate(
        userId,
        { role: 'user' },
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

    return { message: 'User deleted successfully' };
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
