"use strict";
export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your name"
        },
        validate: {
          isValidLength: value => {
            if (value.length < 6) {
              throw new Error("Name should be at least 6 characters");
            }
          }
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your username"
        },
        unique: { args: true, msg: "Username already exists" },
        validate: {
          isValidLength: value => {
            if (value.length < 6) {
              throw new Error("Username should be at least 6 characters");
            }
          }
        }
      },
      homeLocation: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      lastLocation: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      isHomeSecured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
