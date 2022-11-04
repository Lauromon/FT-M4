const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ability', {
    name: {
      type: DataTypes.STRING,
      unique: 'compositeIndex',
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    mana_cost: {
      type: DataTypes.FLOAT,
      unique: 'compositeIndex',
      allowNull: false,
      validate: {
        min: 10.0,
        max: 250
      }
    },
    summary: {
      type: DataTypes.VIRTUAL,
      get(){
        return `${this.name} (${Math.floor(this.mana_cost)} points of mana) - Description: ${this.description}`
      }
    }

  })
}