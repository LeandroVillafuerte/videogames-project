const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "genre",
    {
      id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:false
      },
      name: {
        type: DataTypes.STRING,
      },
      image_background:{
        type: DataTypes.STRING,
      }
    },
    {
      timestamps: false,
    }
  );
};
