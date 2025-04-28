import CartProductModel from '../models/cartproduct.model.js';
import UserModel from "../models/user.model.js";

export async function addItemToCartController(request, response) {
    try {
        const userId = request.userId;
        const { productId } = request.body;
        if (!productId) {
            return response.status(402).json({
                message: "Provide productId",
                error: true,
                success: false
            });
        }

        const checkItemCart = await CartProductModel.findOne({
            userId: userId,
            productId: productId
        });
        if (checkItemCart) {
            return response.status(400).json({
                message: "Item already in cart."
            });
        }

        const cartItem = new CartProductModel({
            quantity: 1,
            userId: userId,
            productId: productId
        });

        const save = await cartItem.save();

        const updateCartUser = await UserModel.updateOne(
            {
                _id: userId
            },
            {
                $push: {
                    shopping_cart: productId
                }
            }
        );

        return response.status(200).json({
            data: save,
            message: "Item added successfully.",
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


export async function getCartItemController(request, response) {
    try {
        const userId = request.userId;

        const cartItem = await CartProductModel.find({
            userId: userId
        }).populate('productId');

        return response.status(200).json({
            data: cartItem,
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


export async function updateCartItemQtyController(request, response) {
    try {
        const userId = request.userId;
        const { _id, qty } = request.body;
        if (!_id || !qty) {
            return response.status(400).json({
                message: "Provide _id, qty.",
                error: true,
                success: false
            });
        }

        const updateCartItem = await CartProductModel.updateOne(
            {
                _id: _id,
                userId: userId
            },
            {
                quantity: qty
            }
        );

        return response.status(200).json({
            message: "Cart updated.",
            success: true,
            error: false,
            date: updateCartItem
        });



    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

export async function deleteCartItemController(request, response) {
    try {
        const userId = request.userId;
        const { _id, productId } = request.body;
        if (!_id) {
            return response.status(400).json({
                message: "Provide _id",
                error: true,
                success: false
            });
        }

        const deleteCartItem = await CartProductModel.deleteOne(
            {
                _id: _id,
                userId: userId
            }
        );
        if (!deleteCartItem) {
            return response.status(404).json({
                message: "The product item not found.",
                error: true,
                success: false
            });
        }

        const user = await UserModel.findOne({
            _id: userId
        })

        const cartItems = user?.shopping_cart;

        const updatedUserCart = [...cartItems.slice(0, cartItems.indexOf(productId)), ...cartItems.slice(cartItems.indexOf(productId) + 1)];

        user.shopping_cart = updatedUserCart;
        await user.save();

        return response.status(200).json({
            message: "Item removed",
            error: false,
            success: true,
            data: deleteCartItem
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}