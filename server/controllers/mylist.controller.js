import MyListModel from "../models/myList.model.js";

export async function addToMyListController(request, response) {
    try {
        const userId = request.userId;
        const {
            productId,
            productTitle,
            image,
            rating,
            price,
            oldPrice,
            brand,
            discount
        } = request.body;

        const item = await MyListModel.findOne({
            userId: userId,
            productId: productId
        });
        if (item) {
            return response.status(400).json({
                message: "Item is already in My List."
            })
        }

        const myList = new MyListModel({
            productId,
            productTitle,
            image,
            rating,
            price,
            oldPrice,
            brand,
            discount,
            userId
        });

        const save = await myList.save();

        return response.status(200).json({
            error: false,
            success: true,
            message: "The product added in My List"
        });

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


export async function deleteFromMyListController(request, response) {
    try {
        const myListItem = await MyListModel.findById(request.params.id);
        if (!myListItem) {
            return response.status(400).json({
                error: true,
                success: false,
                message: "The item with this given id was not found."
            });
        }

        const deletedItem = await MyListModel.findByIdAndDelete(request.params.id);
        if (!deletedItem) {
            return response.status(400).json({
                error: true,
                success: false,
                message: "The item is not deleted."
            });
        }

        return response.status(200).json({
            errorr: false,
            success: true,
            message: "The item deleted."
        });



    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}


export async function getMyListController(request, response) {
    try {
        const userId = request.userId;

        const myListItems = await MyListModel.find({
            userId: userId
        });

        return response.status(200).json({
            error: false,
            success: true,
            data: myListItems
        });


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}