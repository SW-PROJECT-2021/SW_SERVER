const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];
const db = {};
let sequelize;

if (config.use_env_variable) {
 sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
 sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Product = require('./product')(sequelize, Sequelize);
db.Category = require('./category')(sequelize, Sequelize);
db.Basket = require('./basket')(sequelize, Sequelize);
db.Destination = require('./destination')(sequelize, Sequelize);
db.Banner = require('./banner')(sequelize, Sequelize);

// 1 : N 관계 Category : Product
db.Category.hasMany(db.Product);
db.Product.belongsTo(db.Category);

// 1 : N 관계 Product : Basket
db.Product.hasMany(db.Basket);
db.Basket.belongsTo(db.Product);

// 1 : N 관계 User : Basket
db.User.hasMany(db.Basket);
db.Basket.belongsTo(db.User);

// 1 : N 관계 User : Destination
db.User.hasMany(db.Destination);
db.Destination.belongsTo(db.User);

module.exports = db;