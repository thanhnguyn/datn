import CartModel from '../models/cart.model.js';

export async function addItemToCartController(request, response) {
    try {
        const userId = request.userId;
        const { productTitle, image, rating, price, oldPrice, discount, size, weight, ram, quantity, subTotal, productId, countInStock, brand } = request.body;
        if (!productId) {
            return response.status(402).json({
                message: "Provide productId",
                error: true,
                success: false
            });
        }

        const checkItemCart = await CartModel.findOne({
            userId: userId,
            productId: productId
        });
        if (checkItemCart) {
            return response.status(400).json({
                message: "Item already in cart."
            });
        }

        const cartItem = new CartModel({
            productTitle: productTitle,
            image: image,
            rating: rating,
            price: price,
            oldPrice: oldPrice,
            discount: discount,
            quantity: quantity,
            subTotal: subTotal,
            productId: productId,
            countInStock: countInStock,
            userId: userId,
            brand: brand,
            size: size,
            weight: weight,
            ram: ram
        });

        const save = await cartItem.save();

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

        const cartItems = await CartModel.find({
            userId: userId
        });

        return response.status(200).json({
            data: cartItems,
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
        const { _id, qty, subTotal } = request.body;
        if (!_id || !qty || !subTotal) {
            return response.status(400).json({
                message: "Provide _id, qty, subTotal.",
                error: true,
                success: false
            });
        }

        const updateCartItem = await CartModel.updateOne(
            {
                _id: _id,
                userId: userId
            },
            {
                quantity: qty,
                subTotal: subTotal
            },
            {
                new: true
            }
        );

        return response.status(200).json({
            message: "Cart updated.",
            success: true,
            error: false,
            data: updateCartItem
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
        const { id } = request.params;
        if (!id) {
            return response.status(400).json({
                message: "Provide _id",
                error: true,
                success: false
            });
        }

        const deleteCartItem = await CartModel.deleteOne(
            {
                _id: id,
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