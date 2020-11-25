const jwt = require("jsonwebtoken");
const Teams = require("../mongoose/models/teams");

const auth = async (req, res, next) => {
  try {
    // const ver = req.header("Authorization");
    // console.log("hi "+ver)
    const token = req.header("Authorization").replace("Bearer ", "");
    //console.log(token);
    const decoded = jwt.verify(token, "ThisJwtTokenIsUsedToValidateTheUser");
    const team = await Teams.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!team) {
      throw new Error();
    }
    req.team = team;
    req.token = token;
    next();
  } catch (e) {
    res.status(400).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
