import type { Permission } from "../types/auth";

export interface MenuItem {
  key: string;
  label: string;
  permission: Permission;
}

export const menuItems: MenuItem[] = [
  { key: "dashboard", label: "控制台", permission: "dashboard:view" },
  { key: "user", label: "用户管理", permission: "user:view" },
  { key: "settings", label: "设置", permission: "settings:view" },
];
