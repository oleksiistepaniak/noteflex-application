const userRepository = require("../repositories/user.repo");
const messages = require("../util/api.messages");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require('../models/user.model');
const userDtoMapper = require('../dto/user.dto.mapper');

// params consist of params.email, params.password, params.age, params.firstName, params.lastName
async function signup(params) {
    const existingUser = await userRepository.findUserByEmail(params.email);
    if (existingUser) {
        throw new Error(messages.apiMessages.REGISTRATION.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(params.password, 10);

    // CREATING NEW INSTANCE OF USER VIA CONSTRUCTOR
    const user = new User({
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        password: hashedPassword,
        age: params.age,
    });

    const result = await userRepository.createUser(user);
    return userDtoMapper.mapUserToDto({
        id: result.insertId,
        user,
    });
}

// params consist of params.password and params.email
async function authenticate(params) {
    const user = await userRepository.findUserByEmail(params.email);

    if (!user) {
        throw new Error(messages.apiMessages.AUTHENTICATION.INVALID_PASSWORD_OR_EMAIL);
    }

    const isPasswordMatch = await bcrypt.compare(params.password, user.password);
    if (!isPasswordMatch) {
        throw new Error(messages.apiMessages.AUTHENTICATION.INVALID_PASSWORD_OR_EMAIL);
    }

    const token = jwt.sign({userId: user.id}, "secret_key", {expiresIn: "1d"});
    return token;
}

module.exports = {
    signup,
    authenticate,
}
