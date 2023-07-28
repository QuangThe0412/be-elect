import { ConvertFormData, domain, token } from "./common";

export interface UserRole {
  id: string,
  userId: string | null,
  roleId: string,
  dateFix: Date | null,
  dateCreate: Date | null,
  isActive: boolean,
};

export interface ResponseUserRoleApi {
  code: number | null,
  mess: string | null,
  data: UserRole[]
};

/**
 * Hàm lấy UserRole dựa vào idUser
 * @returns 
 */
export const ApiGetUserRoleByIdUser = async (idUser: string) => {
  try {
    const response = await fetch(`${domain}/api/userroles/${idUser}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    if (response && response.ok) {
      let result: ResponseUserRoleApi = await response.json();
      return result;
    }
    console.log("Thất bại:", "ApiGetUserRoleByIdUser");
  } catch (error) {
    console.log('Lỗi ApiGetUserRoleByIdUser:', error)
  }
}

/**
 * Hảm thêm mới với api
 * @param UserRoles thông tin được tạo
 * @returns 
 */
export const ApiAddUserRole = async (data: UserRole) => {
  try {
    const formData = await ConvertFormData(data);
    const response = await fetch(`${domain}/api/userroles`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response && response.ok) {
      const result: ResponseUserRoleApi = await response.json();
      return result;
    }
    console.error('Thất bại:', "ApiAddUserRole");
  } catch (error) {
    console.error('Lỗi ApiAddUserRole:', error);
  }
}

/**
 * Api cập nhật UserRole
 * @param UserRoles 
 * @param file 
 * @returns 
 */
export const ApiUpdateUserRole = async (data: UserRole, file: any) => {
  try {
    const formData = await ConvertFormData(data, file);
    const response = await fetch(`${domain}/api/userroles`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response && response.ok) {
      const result: ResponseUserRoleApi = await response.json();
      return result;
    }
    console.error('Thất bại:', 'ApiUpdateUserRole');
  } catch (error) {
    console.error('Lỗi ApiUpdateUserRole:', error);
  }
}
