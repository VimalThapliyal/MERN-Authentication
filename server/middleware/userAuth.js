import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({
      success: false,
      message: "Not Authoried Login Again",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.id) {
      req.body.userId = decoded.id;
    } else {
      return res.json({
        success: false,
        message: "Not authorized login",
      });
    }
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export default userAuth;
