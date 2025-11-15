const jwt = require('jsonwebtoken')

const jwnAuthMiddleware = (req, res, next) => {
    //first check request headers has authorization or not 
    const authorization = req.headers.authorization
    if(!authorization) return res.status(401).json('token not found / please login')

    // Extrect the jwt form the requesr header
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unathorozied' })

    try {
        // verify the token 
        const decode = jwt.verify(token, process.env.JWT_SECRET)

        // Attech user info to request object
        req.user = decode
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'invalid token ' })

    }
}

// Function to generate JWT token
const generateToken = (userData) => {
    return jwt.sign(userData, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
};

module.exports = { jwnAuthMiddleware, generateToken };