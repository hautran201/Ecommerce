const errorHandle = (err, req, res, next) => {
    //jwt error handler
    if (err.name === 'UnauthorizedError') {
        return res
            .status(500)
            .json({ message: 'You are not allowed to do that!' })
    }

    //validation error handler
    if (err.name === 'ValidationError') {
        return res.status(500).json({ message: err })
    }

    res.status(500).json(err)
}

export default errorHandle
