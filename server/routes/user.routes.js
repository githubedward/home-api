import express from "express";
import user from "../controllers/user.controller";

const router = express.Router();

router.post("/register", user.register);
router.put("/home-location", user.updateHomeLocation);
router.put("/current-location", user.updateCurrentLocation);
router.put("/home-secured", user.homeSecured);

module.exports = router;
