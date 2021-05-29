// const { Product, User } = require('./index');

// module.exports = (sequelize, DataTypes) => {
// 	return sequelize.define('Review', {
//     ProductId: {
//       type: DataTypes.INTEGER,
//       reference: {
//         model: Product,
//         key: 'id',
//       }
//     },
//     OrderHistoryId: {
//       type: DataTypes.INTEGER,
//       reference: {
//         model: OrderHistory,
//         key: 'id',
//       }
//     },
//     productCount: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   }, {
//     freezeTableName: true,
//     timestamps: false,
//   });
// }
