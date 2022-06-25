const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require('../middleware/fetchUser');

const { body, validationResult } = require("express-validator");

const JWT_SECRET = "Thisisajwtsecrettokenforthejwttokens";

// ROUTE 1 : Create a User using POST "/api/auth/createuser" . No Login Required

router.post(
  "/createuser",
  [
    body("email", "Enter a valid email").isEmail(),

    body("name", "Enter a valid name ").isLength({ min: 3 }),
    body("password", "Password must be of atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {

    let success =false;
    // If there are errors => return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() ,success});
    }

    try {
      // Check whether the user with same email exists already
      let checkUser = await User.findOne({ email: req.body.email });

      if (checkUser) {
        return res.status(400).json({ error: "Email already registered",success });
      }

      // Encrypting password
      const salt = await bcrypt.genSalt(10);
      const secPassword = await bcrypt.hash(req.body.password, salt);

      // Creating a new user
      let user = await User.create({
        name: req.body.name,
        email: req.body.email,

        password: secPassword,
      });

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);

      console.log(authToken);
      success = true;

      res.json({ authToken,success });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

// ROUTE 2 :  Authenticate a user using POST '/api/auth/login'
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    // If there are errors => return bad request and errors
    const errors = validationResult(req);
    let success =false;
    if (!errors.isEmpty()) {
      success = false;
      return res.status(400).json({ success,errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      success = false;

      if (!user) {
        return res
          .status(400)
          .json({
            error:
              "Incorrect Credentials ! Try to login with correct credentials",
              success
          });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);

      if (!passwordCompare) {
        return res
          .status(400)
          .json({
            error:
              "Incorrect Credentials ! Try to login with correct credentials",
              success
          });
      }

      const data = {
        user: {
          id: user.id,
        },
      };

      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({success,authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3 :  Getting the loggedin User Details Using POST '/api/auth/getuser'  Login Required

router.post(
  "/getuser",fetchUser, async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");

      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
