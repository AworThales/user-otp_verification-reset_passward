import { Router } from "express";
const router = Router();
/** importinf all controllers */
import * as controller from "../controllers/appController.js";
import Auth, { localVariables } from "../middleware/auth.js";
import { registerMail } from "../controllers/mailer.js";

// Post Methods
// router.route('/register').post((req,res) => res.json("register route")); //register user
router.route('/register').post(controller.register); //register user
router.route('/registerMail').post(registerMail); //To send the email
router.route("/authenticate").post(controller.verifyUser, (req,res) => res.end()); //To authenticate users
router.route("/login").post(controller.verifyUser, controller.login); //login our app

// Get Methods
router.route("/user/:username").get(controller.getUser); //user with username
router.route("/generateOTP").get(controller.verifyUser, localVariables, controller.generateOTP); //To generate random OTP
router.route("/verifyOTP").get(controller.verifyOTP); //To verify generated OTP
router.route("/createResetSession").get(controller.createResetSession); //Tp reset all the variables

// Put Methods
router.route("/updateUser").put( Auth, controller.updateUser); // To update the user profile
router.route("/resetPassword").put(controller.verifyUser, controller.resetPassword); //To reset password

export default router; 