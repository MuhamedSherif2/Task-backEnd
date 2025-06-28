const UserModel = require('../Model/User.Model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.Register = async function (req, res) {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Name, email, password, and role are required.' });
        }

        const nameClean = name.trim();
        const emailClean = email.trim().toLowerCase();

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            name: nameClean,
            email: emailClean,
            password: hashedPassword,
            role
        });

        const user = await newUser.save();
        console.log("✅ User saved:", user);

        res.json({
            message: 'User registered successfully',
            user: {
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.stack });
    }
};

exports.Login = async function (req, res) {
    try {
        const emailClean = req.body.email.trim().toLowerCase();
        const user = await UserModel.findOne({ email: emailClean });

        if (!user || !await user.comparePassword(req.body.password)) {
            return res.status(400).send({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({
            email: user.email,
            _id: user._id,
            role: user.role
        }, 'secretKey');

        return res.json({
            message: 'Login successful',
            user: {
                email: user.email,
                name: user.name,
                jwt: token
            }
        });
    } catch (error) {
        res.status(400).send({ message: error.stack });
    }
};