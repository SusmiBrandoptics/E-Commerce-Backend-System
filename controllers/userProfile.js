const User = require("../models/user")

// list users
const getUsers = async (req, res) => {

    try {
        const user = await User.find().select("-password")

        res.status(200).json({
            success: true,
            data: user
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}

// get user by id
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password")
        if (!user) {
            return res.status(400).json({
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            data: user
        })


    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

// Update user
const updateProfile = async (req, res) => {

    try {

        const { name, email, phone } = req.body;

        const updatedUser = await User.findByIdAndUpdate(req.params.id,
            { name, email, phone },
            { new: true, runValidator: true }).select("-password")

        if (!updatedUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser
        })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

// Delete user
const deleteUser = async (req, res) => {

    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id).select("-password")

        if (!deletedUser) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            data: deletedUser
        })

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

}

module.exports = {
    getUsers,
    getUserById,
    updateProfile,
    deleteUser
}