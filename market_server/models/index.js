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
db.OrderHistory = require('./orderHistory')(sequelize, Sequelize);
db.Orders = require('./orders')(sequelize, Sequelize);
db.Coupon = require('./coupon')(sequelize, Sequelize);
db.CurrentCoupon = require('./currentCoupon')(sequelize, Sequelize);


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

// 1 : N 관계 User : OrderHistory
db.User.hasMany(db.OrderHistory);
db.OrderHistory.belongsTo(db.User);

// M : N 관계 
db.OrderHistory.belongsToMany(db.Product, { through: 'Orders', as: 'Ordered' }); // OrderHistory가 봤을때 Product는 Ordered!
db.Product.belongsToMany(db.OrderHistory, { through: 'Orders', as: 'Orderer' }); // Product가 봤을때 OrderHistory는 Orderer!

// M : N 관계 
db.Coupon.belongsToMany(db.User, { through: 'CurrentCoupon', as: 'AvailableUser' }); // OrderHistory가 봤을때 Product는 Ordered!
db.User.belongsToMany(db.Coupon, { through: 'CurrentCoupon', as: 'HaveCoupon' }); // Product가 봤을때 OrderHistory는 Orderer!


module.exports = db;
