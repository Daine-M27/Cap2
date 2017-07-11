const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {type: String, default: ""},
    lastName: {type: String, default: ""}
});

UserSchema.methods.apiRepr = function() {
    return {
        username: this.username || '',
        firstName: this.firstName || '',
        lastName: this.lastName || ''
    };
};

UserSchema.methods.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
    return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);
console.log('iwashere');
const aUser = User.create({
    username: 'lkajsdf',
    password: 'hash',
    firstName: 'firstName22',
    lastName: 'lastName22'
});
aUser.save((a,b) =>{
    console.log(a,b)
});
    // User.create({
    //     username: 'lkajsdf',
    //     password: 'hash',
    //     firstName: 'firstName22',
    //     lastName: 'lastName22'
    // },function(a,b) {
    //     console.log(a,b);
    // });
module.exports = {User};