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
        allowNull: false,
        type: DataTypes.JSON,
        validate: {
          isValidCoords: value => {
            if (
              typeof value.latitude !== "number" ||
              typeof value.longitude !== "number"
            ) {
              throw new Error("Invalid coordinates input");
            }
          }
        },
        defaultValue: {
          latitude: 0,
          longitude: 0
        }
      },
      lastLocation: {
        allowNull: false,
        type: DataTypes.JSON,
        validate: {
          isValidCoords: value => {
            if (
              typeof value.latitude !== "number" ||
              typeof value.longitude !== "number"
            ) {
              throw new Error("Invalid coordinates input");
            }
          }
        },
        defaultValue: {
          latitude: 0,
          longitude: 0
        }
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
