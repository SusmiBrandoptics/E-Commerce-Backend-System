const mongoose = require('mongoose')

const orderScema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },

            quantity: {
                type: Number,
                required: true
            }
        }
    ],

    totalAmount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        default: "pending"
    },

    orderDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Order", orderScema)