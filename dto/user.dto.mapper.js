// params consist of params.id, and params.user which is nested object with properties
// user.email, user.password, user.age, user.firstName, user.lastName
// user.password must be ignored for security
function mapUserToDto(params) {
    const dto = {
        id: params.id,
        email: params.user.email,
        age: params.user.age,
        firstName: params.user.firstName,
        lastName: params.user.lastName,
    };
    return dto;
}

module.exports = {
    mapUserToDto,
}
