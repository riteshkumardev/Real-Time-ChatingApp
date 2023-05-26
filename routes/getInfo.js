const jwt = require("jsonwebtoken");
const Register = require("../models/register");
function allconv(app) {
  app.post("/info", async (req, res) => {
    try {
      const { cookieName } = req.cookies;
      const userInfo = await jwt.verify(cookieName, process.env.KEY);
      if (userInfo) {
        const result = await Register.findOne({ _id: userInfo.uid });
        const vst = {
          uid: result._id,
          uname: result.name,
          friends: result.friends.length,
          preq: result.request.length,
        };
        return res.json(vst);
      }
      return res.json(null);
    } catch (e) {
      return res.json(null);
    }
  });
}
module.exports = allconv;
