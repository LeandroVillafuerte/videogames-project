const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      release_date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
      rating: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
      },
      plataforms: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      origin: {
        type: DataTypes.BOOLEAN,
        defaultValue: true 
      },
    },
    {
      timestamps: false,
    }
  );
};
