import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    products: [
        {
            productId: {
                type: String
            },
            productTitle: {
                type: String
            },
            quantity: {
                type: Number
            },
            price: {
                type: Number
            },
            image: {
                type: String
            },
            subTotal: {
                type: Number
            },
            attribute: {
                type: mongoose.Schema.Types.Mixed,
                default: {}
            }
        }
    ],
    paymentId: {
        type: String,
        default: ''
    },
    payment_method: {
        type: String,
        default: 'CASH'
    },
    payment_status: {
        type: String,
        default: ""
    },
    order_status: {
        type: String,
        default: 'pending'
    },
    delivery_address: {
        type: Object,
        default: {}
    },
    totalAmt: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})

const OrderModel = mongoose.model('order', orderSchema)

export default OrderModel;