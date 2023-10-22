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
        const id = req.params.id;
        if (!id) {
            return res.status(500).json({ success: false, message: "Please enter a product ID" })
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(500).json({ success: false, message: "Product don't exist" })
        }

        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({ success: false, error: "Product don't exist" })
    }


}

export const addProduct = async (req, res) => {
    const data = req.body;

    if (!data.name) {
        return res.status(500).json({ success: false, error: "Please enter product name" })
    }
    if (!data.image) {
        return res.status(500).json({ success: false, error: "Please enter product image" })
    }
    if (!data.countInStock) {
        return res.status(500).json({ success: false, error: "Please enter product count in stock " })
    }

    const newProduct = new Product({
        name: data.name,
        image: data.image,
        countInStock: data.countInStock
    })
    await newProduct.save()
        .then((product) => {
            res.status(201).json(product);
        })
        .catch((error) => {
            res.status(500).json({ success: false, error: error })
        })


}


export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id

        const product = await Product.findByIdAndUpdate(id,
            {
                name: req.body.name,
                image: req.body.image,
                countInStock: req.body.countInStock
            });

        res.status(201).json({ success: true, message: 'Product updated successfully' })
    } catch (error) {
        res.status(500).json({ success: false, error: "Product don't exist" })
    }

}