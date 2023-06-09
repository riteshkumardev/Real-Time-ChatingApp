const Register = require("../models/register");
const jwt = require("jsonwebtoken");

function validate(app) {
  app.post("/api/validate", (req, res) => {
    const reg = async () => {
      const crs = await Register.findOne({
        email: req.body.email,
        password: req.body.password,
      });
      if (crs) {
        const token = await jwt.sign(
          {
            uid: crs._id,
            uname: crs.name,
            friends: crs.friends.length,
            preq: crs.request.length,
          },
          process.env.KEY || "default_secret_key"
        );
        res.cookie("cookieName", token, {
          maxAge: 90000000,
          httpOnly: true,
        });
        res.json({
          code: 10,
          msg: "Successful",
          valid: true,
        });
      } else {
        res.json({
          code: 0,
          msg: "Invalid Credentials",
          valid: null,
        });
      }
    };
    reg();
  });
}

module.exports = validate;
