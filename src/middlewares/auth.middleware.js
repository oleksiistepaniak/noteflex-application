const jwt = require("jsonwebtoken");
const {apiMessages} = require("../util/api.messages");

// this middleware provides that every request will consist of req.user nested object with needed
// for us property userId
const authMiddleware = (req, resp, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return resp.status(401).send({
            message: apiMessages.AUTH_MIDDLEWARE.TOKEN_NOT_PROVIDED,
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

        next();
    } catch (error) {
        return resp.status(401).send({
            message: apiMessages.AUTH_MIDDLEWARE.INVALID_TOKEN,
        });
    }
}

module.exports = authMiddleware;
