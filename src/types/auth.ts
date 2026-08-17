export type Permission =  'user:view' | 'user:add' | 'user:edit' | 'user:delete';

export type Role = 'admin' | 'editor' | 'viewer';


export const rolePermissions: Record<Role, Permission[]> = {
    admin: ['user:view', 'user:add', 'user:edit', 'user:delete'],
    editor: ['user:view', 'user:edit'],
    viewer: ['user:view'],
}


export function hasPermission(role: Role, permission: Permission) {
    return rolePermissions[role].includes(permission);
}

export interface CurrentUser {
    id: number;
    username: string;
    role: Role;
}