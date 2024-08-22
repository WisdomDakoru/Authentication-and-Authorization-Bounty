const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});
const bcrypt = require('bcryptjs');

const UserModel = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

// Hash password before saving user
UserModel.beforeSave(async (user, options) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
    }
});

UserModel.prototype.validatePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

module.exports = UserModel;