const { DataTypes, Sequelize } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports =(sequelize) => {
  // defino el modelo
  sequelize.define(
    "videogame",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: function(){return Date.now()+"u"},
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      release_date: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
      rating: {
        type: DataTypes.REAL,
      },
      platforms: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      background_image:{
        type: DataTypes.STRING
      }

    },
    {
      timestamps: false,
    }
  );
};
