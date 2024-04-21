const User = function (newUser) {
    this.email = newUser.email;
    this.firstName = newUser.firstName;
    this.lastName = newUser.lastName;
    this.password = newUser.password;
    this.age = newUser.age;
}

module.exports = User;
