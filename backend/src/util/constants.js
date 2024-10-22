class RoleConstants {
  static ROLE_ADMIN_ID = 1;
  static ROLE_EMPLOYEE_ID = 2;
  static ROLE_USER_ID = 3;

  static GetMessage(roleId) {
    let roleName = "";
    switch (roleId) {
      case RoleConstants.ROLE_ADMIN_ID:
        roleName = "Admin";
        break;
      case RoleConstants.ROLE_EMPLOYEE_ID:
        roleName = "Employee";
        break;
      case RoleConstants.ROLE_USER_ID:
        roleName = "User";
        break;
      default:
        roleName = "";
        break;
    }

    return roleName;
  }
}

export default RoleConstants;
