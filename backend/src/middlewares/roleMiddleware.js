import RoleConstants from "../util/constants.js";

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      const roleName =
        req.user.role_id !== null
          ? RoleConstants.GetMessage(req.user.role_id)
          : null;

      if (!allowedRoles.includes(roleName.toLowerCase())) {
        return res.status(403).json({ message: "Access denied" });
      }
    } catch (err) {
      return res.status(403).json({ message: "Access denied", errors: err });
    }
    next(); // ส่งต่อการควบคุมไปยัง middleware หรือ route handler ถัดไป
  };
};

export default authorizeRoles;
