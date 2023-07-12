import { ResponsePermissionApi, ResponseRoleApi, ResponseUserApi, ResponseUserRolePermissionApi, domain, token } from './common';

export interface User {
    id: string | null;
    username: string | null;
    password: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    dateFix: Date | null,
    dateCreate: Date | null,
};

export interface Permission {
    id: string | null;
    name: string | null;
    description: string | null;
    dateFix: Date | null,
    dateCreate: Date | null,
};

export interface Role {
    id: string | null;
    name: string | null;
    description: string | null;
    dateFix: Date | null,
    dateCreate: Date | null,
};

export interface UserRolePermission {
    id: string | null;
    userId:string | null;
    roleId:string | null;
    permissionId:string | null;
    roleName: string | null;
    permissionName: string | null;
    dateFix: Date | null,
    dateCreate: Date | null,
    isActive:boolean,
};

/**
 * Hàm lấy dữ liệu user từ api
 * @returns Array user từ api
 */
export const ApiGetUsers = async () => {
    try {
        const response = await fetch(`${domain}/api/users`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response && response.ok) {
            let result: ResponseUserApi = await response.json();
            return result;
        }
        console.log("Thất bại:", "ApiGetUsers");
    } catch (error) {
        console.log('Lỗi ApiGetUsers:', error)
    }
}

export const ApiGetRoles = async () => {
    try {
        const response = await fetch(`${domain}/api/roles`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response && response.ok) {
            let result: ResponseRoleApi = await response.json();
            return result;
        }
        console.log("Thất bại:", "ApiGetRoles");
    } catch (error) {
        console.log('Lỗi ApiGetRoles:', error)
    }
}

export const ApiGetPermissions = async () => {
    try {
        const response = await fetch(`${domain}/api/permissions`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response && response.ok) {
            let result: ResponsePermissionApi = await response.json();
            return result;
        }
        console.log("Thất bại:", "ApiGetPermissions");
    } catch (error) {
        console.log('Lỗi ApiGetPermissions:', error)
    }
}

export const ApiGetUserRolePermission = async () => {
    try {
        const response = await fetch(`${domain}/api/userrolepermissions`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response && response.ok) {
            let result: ResponseUserRolePermissionApi = await response.json();
            return result;
        }
        console.log("Thất bại:", "ApiGetUserRolePermission");
    } catch (error) {
        console.log('Lỗi ApiGetUserRolePermission:', error)
    }
}