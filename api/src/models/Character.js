const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('character', {
    id: {
      type: DataTypes.UUID, // Genera un id random con letras y números que va a ser único,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,     // No le permito que este vacío
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    birthday: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM('Alive', 'Deceased', 'Presumed dead', 'Unknown'), //datatypes de enumeración (solo pueden ser esos cuatro) 
      allowNull: false,
    },

    img: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    createdInDb: {
      type: DataTypes.BOOLEAN,      //con esta prop acceso fácil a los creados en db
      allowNull: false,
      defaultValue: true,
    },

  });
};
