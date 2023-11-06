import { expressjwt as jwt } from 'express-jwt'

const isRevoked = async (req, payload, done) => {
    if (payload.isAdmin) {
    }
}

const authJwt = () => {
    const api = process.env.API_URL

    return jwt({
        secret: process.env.SECRET_KEY,
        algorithms: ['HS256'],
        isRevoked: isRevoked,
    }).unless({
        path: [
            { url: /\/api\/v1\/products\/(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories\/(.*)/, methods: ['GET', 'OPTIONS'] },
            `${api}/auth/login`,
            `${api}/auth/register`,
        ],
    })
}

export default authJwt
