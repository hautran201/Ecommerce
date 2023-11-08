import User from '../models/userModel.js'

export const getCountUser = async (req, res) => {
    try {
        const userCount = await User.countDocuments()

        res.status(200).json({ userCount })
    } catch (error) {
        res.status(500).json({ error })
    }
}
