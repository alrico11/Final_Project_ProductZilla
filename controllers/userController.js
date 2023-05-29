const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    const user = new User({
        user_id: req.body.user_id,
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        telephone: req.body.telephone,
        birth_date: req.body.birth_date,
        gender: req.body.gender,
        status_active: req.body.status_active
    });
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        user.user_id = req.body.user_id;
        user.fullname = req.body.fullname;
        user.email = req.body.email;
        user.password = req.body.password;
        user.telephone = req.body.telephone;
        user.birth_date = req.body.birth_date;
        user.gender = req.body.gender;
        user.status_active = req.body.status_active;
        user.modified_at = Date.now();
        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        await user.remove();
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};