import AddressModel from "../models/address.model.js"
import UserModel from "../models/user.model.js";

export async function addAddressController(request, response) {
    try {
        const { address_line1, city, state, pincode, country, mobile, status } = request.body;

        const userId = request.userId;

        if (!address_line1 || !city || !state || !pincode || !country || !mobile || !userId) {

            return response.status(500).json({
                message: "Please provide all the fields.",
                error: true,
                success: false
            });
        }

        const address = new AddressModel({
            ddress_line1, city, state, pincode, country, mobile, status, userId
        });

        const saveAddress = await address.save();

        const updateAddressList = await UserModel.updateOne(
            {
                _id: userId
            },
            {
                $push: {
                    address_details: saveAddress?._id
                }
            }
        )

        return response.status(200).json({
            data: saveAddress,
            message: "Address added successfully.",
            error: false,
            success: true
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}