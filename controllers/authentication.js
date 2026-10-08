const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//create User
const createUser = async (req, res) => {

    try {
        const { name, email, phone, password } = req.body;

        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                message: "All fields are mandatory"
            })
        }

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: "User already exist" })
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name: name,
            email: email,
            phone: phone,
            password: hashedPassword
        })

        await newUser.save()

        return res.status(201).json({
            message: "User created successfully"
        })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

// user login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.cookie("token", token,{
            httpOnly:true,
            secure: false
        })
        
        return res.status(200).json({
            message: "Login successful",
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    login,
    createUser
}