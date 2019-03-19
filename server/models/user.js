"use strict";
export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: {
          args: false,
          msg: "Please enter your username"
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
        allowNull: true,
        type: DataTypes.GEOMETRY("POINT")
      },
      lastLocation: {
        allowNull: true,
        type: DataTypes.GEOMETRY("POINT")
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
