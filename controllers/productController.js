const Product = require("../models/product")


//create product
const createProduct = async(req, res)=>{
    try {
        const {
            name, description, price, category, stock} = req.body
            const image = req.file ? req.file.filename : undefined;

        if (
            !name?.trim() ||
            !description?.trim() ||
            price === undefined ||
            price === null ||
            price === "" ||
            !category?.trim()
        ) {
            return res.status(400).json({
                message: "Name, description, price and category are required"
            });
        }

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            stock,
            image
        });

        await newProduct.save();

        return res.status(201).json({
            message: "Product created successfully",
            data: newProduct
        })
        
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// list products
const listProducts = async (req, res) => {

    try {
        const product = await Product.find()

        return res.status(200).json({
            success: true,
            data: product
        })

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

// get product by id
const getProductsById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
        if (!product) {
            return res.status(400).json({
                message: "Product not found"
            })
        }
        return res.status(200).json({
            success: true,
            data: product
        })


    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}

// Update product by id
const updateProductById = async (req, res) => {

    try {

        const { name, description, price, category, stock } = req.body
        const image = req.file? req.file.filename : undefined;

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
            { name, description, price, category, stock },
            { new: true, runValidators: true })

        if (!updatedProduct) {
            return res.status(404).json({
                message: "Product not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct
        })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}

// Delete product
const deleteProduct = async (req, res) => {

    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)

        if (!deletedProduct) {
            return res.status(404).json({
                message: "Product not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
            data: deletedProduct
        })

    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

}

module.exports = {
    createProduct,
    listProducts,
    getProductsById,
    updateProductById,
    deleteProduct
}