import { ConvertFormData, domain, token } from "./common";

export interface RolePermission {
  id: string,
  roleId: string | null,
  permissionId: string | null,
  dateFix: Date | null,
  dateCreate: Date | null,
  isActive: boolean,
};

export interface ResponseRolePermissionApi {
  code: number | null,
  mess: string | null,
  data: RolePermission[]
};

/**
 * Hàm lấy RolePermision theo idRole
 * @returns 
 */
export const ApiGetRolePermissionByIdRole = async (idRole: string) => {
  try {
    const response = await fetch(`${domain}/api/rolepermissions/${idRole}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response && response.ok) {
      let result: ResponseRolePermissionApi = await response.json();
      return result;
    }
    console.log("Thất bại:", "ApiGetRolePermissionByIdRole");
  } catch (error) {
    console.log('Lỗi ApiGetRolePermissionByIdRole:', error)
  }
}

/**
 * Hảm thêm mới với api
 * @param RolePermissions thông tin được tạo
 * @returns 
 */
export const ApiAddRolePermission = async (data: RolePermission) => {
  try {
    const formData = await ConvertFormData(data);

    const response = await fetch(`${domain}/api/rolepermissions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response && response.ok) {
      const result: ResponseRolePermissionApi = await response.json();
      return result;
    }
    console.error('Thất bại:', "ApiAddRolePermission");
  } catch (error) {
    console.error('Lỗi ApiAddRolePermission:', error);
  }
}

/**
 * Api cập nhật RolePermission
 * @param RolePermissions 
 * @param file 
 * @returns 
 */
export const ApiUpdateRolePermission = async (data: RolePermission, file: any) => {
  try {
    const formData = await ConvertFormData(data, file);
    const response = await fetch(`${domain}/api/rolepermissions`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response && response.ok) {
      const result: ResponseRolePermissionApi = await response.json();
      return result;
    }
    console.error('Thất bại:', 'ApiUpdateRolePermission');
  } catch (error) {
    console.error('Lỗi ApiUpdateRolePermission:', error);
  }
}
