import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    address_line1: {
        type: String,
        default: ""
    },
    city: {
        type: String,
        default: ""
    },
    district: {
        type: String,
        default: ""
    },
    pincode: {
        type: String
    },
    country: {
        type: String
    },
    mobile: {
        type: Number,
        default: null
    },
    landmark: {
        type: String
    },
    addressType: {
        type: String,
        enum: ['Home', 'Office']
    },
    isSelected: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

const AddressModel = mongoose.model('address', addressSchema);

export default AddressModel;