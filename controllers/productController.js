import { populate } from 'dotenv'
import Category from '../models/categoryModel.js'
import Product from '../models/productModel.js'
import mongoose from 'mongoose'

export const getAllProducts = async (req, res) => {
    try {
        let filter = {}
        if (req.query.categories) {
            filter = { category: {$in : req.query.categories.split(',') }}
        }
        console.log(filter)
        const productList = await Product.find(filter ).populate('category')

        res.status(200).json(productList)
    } catch (error) {
        res.status(500).json(error.message)
    }
}

export const getProduct = async (req, res) => {
    try {
        const id = req.params.productId
        if (!id) {
            return res
                .status(500)
                .json({ success: false, message: 'Invallid productId' })
        }

        const product = await Product.findById(id).populate('category')

        if (!product) {
            return res
                .status(500)
                .json({ success: false, message: 'Product not found' })
        }

        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ success: false, error: error.message })
    }
}

export const getCountProduct = async (req, res) => {
    try {
        const productCount = await Product.countDocuments()

        res.status(200).json({ productCount })
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const getFeaturedProduct = async (req, res) => {
    try {
        const count = req.params.count ? req.params.count : 0
        const productFeatured = await Product.find({ isFeatured: true }).limit(
            count,
        )

        res.status(200).json(productFeatured)
    } catch (error) {
        res.status(500).json({ error })
    }
}

export const addProduct = async (req, res) => {
    const category = await Category.findById(req.body.category)
    if (!category) {
        return res
            .status(400)
            .json({ success: false, message: 'Invalid category' })
    }

    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        images: req.body.images,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        isFeatured: req.body.isFeatured,
    })
    await newProduct
        .save()
        .then((product) => {
            res.status(201).json(product)
        })
        .catch((error) => {
            res.status(500).json({ success: false, error: error.message })
        })
}

export const updateProduct = async (req, res) => {
    try {
        const id = req.params.productId
        const isProduct = await Product.findById(id)

        if (!isProduct) {
            return res
                .status(401)
                .json({ success: false, error: 'Product not found' })
        }

        const product = await Product.findByIdAndUpdate(id, {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            isFeatured: req.body.isFeatured,
        })
        
        res.status(201).json({
            success: true,
            message: 'Product updated successfully',
        })
    } catch (error) {
        res.status(500).json({ success: false, error: 'Product not found' })
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.productId
        if (!mongoose.isValidObjectId(id)) {
            return res.status(404).json({ message: 'Invalid product ID' })
        }
        await Product.findByIdAndDelete(id).then(() =>
            res
                .status(200)
                .json({
                    success: true,
                    message: 'Product deleted successfully',
                }),
        )
    } catch (error) {
        res.status(500).json({ success: false, error: 'Product not found' })
    }
}
