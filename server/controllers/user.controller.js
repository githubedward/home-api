import model from "../models";
import * as helper from "../utils/helper";
import message from "../utils/message";

const { User } = model;

export default class UserControls {
  /**
   * Register a user
   * @param {object} req
   * @param {object} res
   * @returns {object} registration status, data object
   */
  static async register(req, res) {
    // assuming that inputs coming in are already deeply validated by the client
    try {
      const data = await User.create(req.body);
      if (!data) return helper.error;
      // if successfully stored in DB, send back data to client
      return res.status(200).json({ data: data, message: message.registered });
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  /**
   * Update user's home location
   * Input from client: { id = Number, homeLocation = Number }
   * @param {object} req
   * @param {object} res
   * @returns {object} status, updated user object
   */
  static async updateHomeLocation(req, res) {
    try {
      const { id, latitude, longitude } = req.body;
      if (!latitude || !longitude || !id)
        return res.status(401).json({ message: message.invalidInput });
      const homeLocation = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      };
      // retrieve user from DB
      const user = await User.findOne({
        where: { id },
        attributes: ["id", "homeLocation", "isHomeSecured", "lastLocation"]
      });
      // update homeLocation
      const updatedUser = await user.update({
        homeLocation
      });
      // send response to client
      return res.status(200).json({
        data: updatedUser.dataValues,
        message: message.updatedHome
      });
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  /**
   * Update user's current location
   * Input from client: { id = Number, currentLocation = Number }
   * @param {object} req
   * @param {object} res
   * @returns {object} status, updated user object
   */
  static async updateCurrentLocation(req, res) {
    try {
      const { id, latitude, longitude } = req.body;
      if (!latitude || !longitude || !id)
        return res.status(401).json({ message: message.invalidInput });
      const lastLocation = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude)
      };
      // retrieved user from DB
      const user = await User.findOne({
        where: { id },
        attributes: ["id", "homeLocation", "isHomeSecured", "lastLocation"]
      });
      const { homeLocation, isHomeSecured } = user.dataValues;
      const isUserHome = helper.isHome(homeLocation, lastLocation);
      // if user is home and home is secured
      // change isHomeSecured to false & send secured status to client
      if (isUserHome && isHomeSecured) {
        const updatedUser = await user.update({
          lastLocation,
          isHomeSecured: false
        });
        return res.status(200).json({
          data: updatedUser.dataValues,
          message: message.securedHome
        });
      }

      // if user is home and home is not secured OR
      // if user is not home and home is secured
      // update last location and send secured status to client
      if ((isUserHome && !isHomeSecured) || (!isUserHome && isHomeSecured)) {
        const updatedUser = await user.update({
          lastLocation
        });
        return res.status(200).json({
          data: updatedUser.dataValues,
          message: message.securedHome
        });
      }

      // if user is not home and home is not secured
      // update last location and send a warning to the client
      if (!isUserHome && !isHomeSecured) {
        const updatedUser = await user.update({
          lastLocation
        });
        return res.status(200).json({
          data: updatedUser,
          message: message.notSecuredHome
        });
      }
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  /**
   * Update home security status
   * @param {object} req
   * @param {object} res
   * @returns {object} status, updated user object
   */
  static async homeSecured(req, res) {
    try {
      const { id } = req.body;
      // retrieve user from DB
      const user = await User.findOne({
        where: { id },
        attributes: ["id", "homeLocation", "isHomeSecured", "lastLocation"]
      });
      const updatedUser = await user.update({
        isHomeSecured: true
      });
      return res.status(200).json({
        data: updatedUser,
        message: message.securedHome
      });
    } catch {
      return res.status(500).json({ message: message.error });
    }
  }
}
