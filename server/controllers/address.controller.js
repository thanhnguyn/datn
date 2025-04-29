import AddressModel from "../models/address.model.js"
import UserModel from "../models/user.model.js";

export async function addAddressController(request, response) {
    try {
        const { address_line1, city, state, pincode, country, mobile, status, userId } = request.body;

        if (!address_line1 || !city || !state || !pincode || !country || !mobile || !userId) {

            return response.status(500).json({
                message: "Please provide all the fields.",
                error: true,
                success: false
            });
        }

        const address = new AddressModel({
            address_line1, city, state, pincode, country, mobile, status, userId
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


export async function getAddressController(request, response) {
    try {
        const address = await AddressModel.find({ userId: request?.query?.userId });

        if (!address) {
            return response.status(404).json({
                error: true,
                success: false,
                message: "Address not found"
            });
        } else {
            const updateUser = await UserModel.updateOne(
                {
                    _id: request?.query?.userId
                },
                {
                    $push: {
                        address: address?._id
                    }
                }
            );


            return response.status(200).json({
                error: false,
                success: true,
                data: address
            });
        }


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


export async function deleteAddressController(request, response) {
    try {
        const userId = request.userId;
        const _id = request.params.id;
        if (!_id) {
            return response.status(400).json({
                message: "Provide _id",
                error: true,
                success: false
            });
        }

        const deleteAddress = await AddressModel.deleteOne(
            {
                _id: _id,
                userId: userId
            }
        );
        if (!deleteAddress) {
            return response.status(404).json({
                message: "The address not found.",
                error: true,
                success: false
            });
        }

        return response.status(200).json({
            message: "Address removed",
            error: false,
            success: true,
            data: deleteAddress
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}