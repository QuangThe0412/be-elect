import { ConvertFormData, domain, token } from "./common";

export interface Role {
    id: string,
    name: string | null,
    description: string | null,
    dateFix: Date | null,
    dateCreate: Date | null,
    isActive : boolean,
};
  
export interface ResponseRoleApi {
    code: number | null,
    mess: string | null,
    data: Role[]
  };
export interface ResponseRoleApiDetail {
    code: number | null,
    mess: string | null,
    data: Role
  };

  /**
   * Hàm lấy dữ liệu Role từ api
   * @returns
   */
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
  
  /**
   * Hàm lấy dữ liệu chi tiết
   * @returns 
   */
  export const ApiGetRoleDetails = async (id: string) => {
    try {
      const response = await fetch(`${domain}/api/roles/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response && response.ok) {
        let result: ResponseRoleApiDetail = await response.json();
        return result;
      }
      console.log("Thất bại:", "ApiGetRoleDetails");
    } catch (error) {
      console.log('Lỗi ApiGetRoleDetails:', error)
    }
  }
  
  /**
   * Hảm thêm mới với api
   * @param Roles thông tin được tạo
   * @returns 
   */
  export const ApiAddRole = async (data: Role) => {
    try {
      const formData = await ConvertFormData(data);
  
      const response = await fetch(`${domain}/api/roles`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response && response.ok) {
        const result: ResponseRoleApi = await response.json();
        return result;
      }
      console.error('Thất bại:', "ApiAddRole");
    } catch (error) {
      console.error('Lỗi ApiAddRole:', error);
    }
  }
  
  /**
   * Api cập nhật role
   * @param Roles 
   * @param file 
   * @returns 
   */
  export const ApiUpdateRole = async (data: Role) => {
    try {
      const response = await fetch(`${domain}/api/roles`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response && response.ok) {
        const result: ResponseRoleApi = await response.json();
        return result;
      }
      console.error('Thất bại:', 'ApiUpdateRole');
    } catch (error) {
      console.error('Lỗi ApiUpdateRole:', error);
    }
  }
  
  /**
   * Xóa Role
   * @param id id Role
   * @returns 
   */
  export const ApiDeletedRole = async (id: string) => {
    try {
      const response = await fetch(`${domain}/api/roles/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response && response.ok) {
        const result: ResponseRoleApi = await response.json();
        return result;
      }
      console.error('Thất bại:', 'ApiDeletedRole');
    } catch (error) {
      console.error('Lỗi ApiDeletedRole:', error);
    }
  }