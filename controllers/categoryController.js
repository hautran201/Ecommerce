import Category from "../models/categoryModel.js";


export const getAllCategory = async (req, res, next) => {

    try {
        const category = await Category.find();

        res.status(201).json({ success: true, data: category })
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }

}


export const addCategory = async (req, res, next) => {
    try {
        const category = new Category({
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        });

        await category.save().then((category) => {
            res.status(201).json({ success: true, message: "A category has been created" });
        })

    } catch (error) {
        res.status(500).json({ success: false, error: error.message, message: "The category can not be created" });
    }
}


export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.categoryId

        const category = await Category.findByIdAndRemove(categoryId);

        if (category) {
            return res.status(201).json({ success: true, message: "The category is deleted" })
        }



    } catch (error) {
        res.status(404).json({ success: false, error: error.message, message: "The category not found" })
    }
}
