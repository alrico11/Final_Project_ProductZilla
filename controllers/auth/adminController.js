const User = require('../../models/user/user');

exports.getAllAdmins = async (req, res) => {
    try {
        const admins = await User.find({ isAdmin: true });
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAdminById = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if (!admin || !admin.isAdmin) res.status(404).json({ message: 'Admin not found' });
        else res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createAdmin = async (req, res) => {
    const admin = new User({
        fullname: req.body.fullname,
        email: req.body.email,
        isAdmin: true,
        password: req.body.password,
        telephone: req.body.telephone,
        birth_date: req.body.birth_date,
        gender: req.body.gender,
    });
    try {
        const newAdmin = await admin.save();
        res.status(201).json(newAdmin);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateAdmin = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if (!admin || !admin.isAdmin) res.status(404).json({ message: 'Admin not found' });

        admin.fullname = req.body.fullname || admin.fullname;
        admin.email = req.body.email || admin.email;
        admin.password = req.body.password || admin.password;
        admin.telephone = req.body.telephone || admin.telephone;
        admin.birth_date = req.body.birth_date || admin.birth_date;
        admin.gender = req.body.gender || admin.gender;

        const updatedAdmin = await admin.save();
        res.status(200).json(updatedAdmin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await User.findById(req.params.id);
        if (!admin || !admin.isAdmin) res.status(404).json({ message: 'Admin not found' });

        await admin.deleteOne();
        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};