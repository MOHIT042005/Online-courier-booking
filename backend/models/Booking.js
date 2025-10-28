const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Booking = sequelize.define("Booking", {
  senderName: { type: DataTypes.STRING, allowNull: false },
  senderAddress: { type: DataTypes.TEXT, allowNull: false },
  senderPhone: { type: DataTypes.STRING, allowNull: false },
  receiverName: { type: DataTypes.STRING, allowNull: false },
  receiverAddress: { type: DataTypes.TEXT, allowNull: false },
  receiverPhone: { type: DataTypes.STRING, allowNull: false },
  packageWeight: { type: DataTypes.FLOAT, allowNull: false },
  packageDimensions: { type: DataTypes.STRING },
  packageDescription: { type: DataTypes.TEXT },
  deliveryType: { type: DataTypes.STRING, allowNull: false, defaultValue: "standard" },
  deliveryDate: { type: DataTypes.DATEONLY, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false }, // FK to User
}, {
  timestamps: true,
});

module.exports = Booking;
