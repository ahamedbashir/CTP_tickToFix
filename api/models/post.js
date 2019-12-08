'use strict';
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Post extends Model {}

  Post.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 32],
        notEmpty: true,
      }
    },
    content: {
      type: DataTypes.STRING,
      validate: {
        len: [3, 250],
        notEmpty: true,
      }
    },
    userName: {
      type:DataTypes.STRING,
      validate: {
        len: [3, 25],
        notEmpty: true,
      }
    },
    contactNum: {
      type: DataTypes.STRING,
      validate: {
        len: [10, 12],
        notEmpty: true,
      }
    },
    apt: {
      type: DataTypes.STRING,
      validate: {
        len: [2, 6],
        notEmpty: true,
      }
    },
    severity: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
    status: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      }
    },
    ticketNum: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    }
  }, 
  {
    sequelize,
    modelName: 'post'
  });

  Post.associate = (models) => {
    // associations can be defined here
  };

  return Post;
};