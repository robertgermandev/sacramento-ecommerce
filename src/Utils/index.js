export const checkUserRole = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return;

  const { userRoles } = currentUser;

  if (userRoles.includes("admin")) return true;

  return false;
};
