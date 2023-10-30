import Category from "../models/categoryModel.js";
import Product from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json("")
    }

}

export const getProduct = async (req, res) => {
    try {
        const id = req.params.productId;
        if (!id) {
            return res.status(500).json({ success: false, message: "Please enter a product ID" })
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(500).json({ success: false, message: "Product not found" })
        }

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }


}

export const addProduct = async (req, res) => {


    const category = await Category.findById(req.body.categoryId)
    if (!category) {
        return res.status(400).json({ success: false, message: "Invalid category" })
    }

    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        categoryId: req.body.categoryId,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured

    })
    await newProduct.save()
        .then((product) => {
            res.status(201).json(product);
        })
        .catch((error) => {
            res.status(500).json({ success: false, error: error.message })
        })


}


export const updateProduct = async (req, res) => {
    try {
        const id = req.params.productId

        const product = await Product.findByIdAndUpdate(id,
            {
                name: req.body.name,
                description: req.body.description,
                richDescription: req.body.richDescription,
                image: req.body.image,
                images: req.body.images,
                brand: req.body.brand,
                price: req.body.price,
                categoryId: req.body.categoryId,
                countInStock: req.body.countInStock,
                rating: req.body.rating,
                isFeatured: req.body.isFeatured
            });

        res.status(201).json({ success: true, message: 'Product updated successfully' })
    } catch (error) {
        res.status(500).json({ success: false, error: "Product not found" })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.productId
        if (!id) {
            return res.status(404).json({ message: 'Please enter a product ID' })
        }
        await Product.findByIdAndDelete(id)
            .then(() => res.status(200).json({ success: true, message: 'Product deleted successfully' }))

    } catch (error) {
        res.status(500).json({ success: false, error: "Product not found" })
    }
}