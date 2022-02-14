const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("occupation", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};

// No le paso el id porque se va a generar solo