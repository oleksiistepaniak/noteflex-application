const jwt = require("jsonwebtoken");
const {apiMessages} = require("../util/api.messages");

const authMiddleware = (req, resp, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return resp.status(401).send({
            message: apiMessages.AUTH_MIDDLEWARE.TOKEN_NOT_PROVIDED,
        });
    }

    try {
        const decoded = jwt.verify(token, "secret_key");
        req.user = decoded;

        next();
    } catch (error) {
        return resp.status(401).send({
            message: apiMessages.AUTH_MIDDLEWARE.INVALID_TOKEN,
        });
    }
}

module.exports = authMiddleware;
