const express = require('express');

const { getUsers, getUserById, updateProfile, deleteUser } = require('../controllers/userProfile');
const { createUser, login, logout } = require('../controllers/authentication');
const { validateToken, authorizeRoles } = require('../middleware/authMiddleware');

const userRoutes = express.Router()

userRoutes.post('/login', login)

userRoutes.post('/create', createUser)

userRoutes.get('/', validateToken, authorizeRoles("admin"), getUsers)

userRoutes.get('/:id', validateToken, authorizeRoles("admin"), getUserById)

userRoutes.delete('/:id',validateToken, authorizeRoles("admin"), deleteUser)

userRoutes.put('/profile', validateToken, updateProfile)

userRoutes.post('/logout', logout)

module.exports = userRoutes