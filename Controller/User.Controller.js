const UserModel = require('../Model/User.Model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.Register = async function (req, res) {
    try {
        console.log("📥 Register endpoint hit");
        console.log("➡️ Request body:", req.body);

        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: 'Name, email, password, and role are required.' });
        }

        const emailClean = email.trim().toLowerCase();
        const nameClean = name.trim();
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({ name: nameClean, email: emailClean, password: hashedPassword, role });
        const user = await newUser.save(); // ← هنا تم تعريفه

        console.log("✅ User saved to DB:", user);

        return res.json({
            message: 'User registered successfully',
            user: {
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        console.error("❌ Error in Register:", error);
        return res.status(500).json({ message: error.stack });
    }
};


exports.showName = async function (req, res) {
    try {
        const userName = await UserModel.find({ user: req.user._id })
        res.json({
            userName, user: {
                name: user.name,
            }
        })
    } catch (error) {
        res.status(404).send({
            message: error.stack
        })
    }
}

exports.Login = async function (req, res) {
    try {
        let user = await UserModel.findOne({ email: req.body.email })
        if (!user || !await user.comparePassword(req.body.password)) {
            res.status(400).send({ massage: 'invalid email or password' })
        } else {
            const token = jwt.sign({
                email: user.email,
                _id: user._id,
                role: user.role
            },
                'secretKey'
            )
            return res.json({
                message: 'Login successful',
                user: {
                    email: user.email,
                    name: user.name,
                    jwt: token
                }
            })
        }
    } catch (error) {
        res.status(400).send({
            message: error.stack
        })
    }
}