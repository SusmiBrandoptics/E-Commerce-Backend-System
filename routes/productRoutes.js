const express = require('express');

const { validateToken, authorizeRoles } = require('../middleware/authMiddleware');
const { createProduct, listProducts, getProductsById, updateProductById, deleteProduct } = require('../controllers/productController');
const upload = require('../middleware/uploadMiddleware');

const productRoutes = express.Router()

productRoutes.post('/create', validateToken, authorizeRoles("admin"), upload.single("image"), createProduct)

productRoutes.get('/', listProducts)

productRoutes.get('/:id', getProductsById)

productRoutes.put('/:id', validateToken, authorizeRoles("admin"), upload.single("image"), updateProductById)

productRoutes.delete('/:id',validateToken, authorizeRoles("admin"), deleteProduct)

module.exports = productRoutes