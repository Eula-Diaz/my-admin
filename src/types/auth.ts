export type Permission =
  | "dashboard:view"
  | "user:view"
  | "user:add"
  | "user:edit"
  | "user:delete"
  | "settings:view";

export type Role = "admin" | "editor" | "viewer";

export const rolePermissions: Record<Role, Permission[]> = {
  admin: [
    "dashboard:view",
    "user:view",
    "user:add",
    "user:edit",
    "user:delete",
    "settings:view",
  ],
  editor: ["dashboard:view", "user:view", "user:edit"],
  viewer: ["dashboard:view", "user:view"],
};

export function hasPermission(role: Role, permission: Permission) {
  return rolePermissions[role].includes(permission);
}

export interface CurrentUser {
  id: number;
  username: string;
  role: Role;
}
