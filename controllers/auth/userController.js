const User = require('../../models/user/user');

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
        if (!user) res.status(404).json({ message: 'User not found' });
        else res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createUser = async (req, res) => {
    const user = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        password: req.body.password,
        telephone: req.body.telephone,
        birth_date: req.body.birth_date,
        gender: req.body.gender,
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
        if (!user) res.status(404).json({ message: 'User not found' });

        user.fullname = req.body.fullname || user.fullname;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        user.telephone = req.body.telephone || user.telephone;
        user.birth_date = req.body.birth_date || user.birth_date;
        user.gender = req.body.gender || user.gender;

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) res.status(404).json({ message: 'User not found' });

        await user.remove();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
