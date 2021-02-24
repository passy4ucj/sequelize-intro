'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        onDelete: "SET NULL",
        foreignKey: "creator",
        as: "creator_of_post"
      })
    }
  };
  Post.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    creator: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
    tableName: "posts"
  });
  return Post;
};