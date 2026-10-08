const jwt = require('jsonwebtoken')

const validateToken = (req, res, next)=>{
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Not authorised, no token"
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

// Role authorization
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        next();
    };
}

module.exports = {validateToken, 
    authorizeRoles
}