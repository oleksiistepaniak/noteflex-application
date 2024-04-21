const userRepository = require("../repositories/user.repo");
const messages = require("../util/api.messages");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// PARAMS CONSIST OF PARAMS.PASSWORD AND PARAMS.EMAIL
async function authenticate(params)
{
        const user = await userRepository.findUserByEmail(params.email);

        if (!user) {
            throw new Error(messages.apiMessages.AUTHENTICATION.INVALID_PASSWORD_OR_EMAIL);
        }

        const isPasswordMatch = await bcrypt.compare(params.password, user.password);
        if (!isPasswordMatch) {
            throw new Error(messages.apiMessages.AUTHENTICATION.INVALID_PASSWORD_OR_EMAIL);
        }

        const token = jwt.sign({ userId: user.id }, "secret_key", { expiresIn: "1d" });
        return token;
}

module.exports = {
    authenticate,
}
