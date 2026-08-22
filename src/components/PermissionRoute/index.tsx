import type { Permission, CurrentUser } from "../../types/auth";
import { Navigate } from "react-router-dom";
import { hasPermission } from "../../types/auth";

interface PermissionRouteProps {
  permission: Permission;
  children: React.ReactNode;
}

function PermissionRoute({ permission, children }: PermissionRouteProps) {
  const userString = localStorage.getItem("user");
  const currentUser: CurrentUser | null = userString
    ? JSON.parse(userString)
    : null;
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  const allowed = currentUser && hasPermission(currentUser.role, permission);
  if (allowed) {
    return children;
  } else {
    return <Navigate to="/403" replace />;
  }
}

export default PermissionRoute;
