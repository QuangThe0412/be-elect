import { ConvertFormData, domain, token } from "./common";

export interface Permission {
    id: string,
    name: string | null,
    description: string | null,
    dateFix: Date | null,
    dateCreate: Date | null,
};

export interface ResponsePermissionApi {
    code: number | null,
    mess: string | null,
    data: Permission[]
  };

  
  /**
   * Hàm lấy dữ liệu Permission từ api
   * @returns
   */
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
  
  /**
   * Hàm lấy dữ liệu chi tiết
   * @returns 
   */
  export const ApiGetPermissionDetails = async (id: string) => {
    try {
      const response = await fetch(`${domain}/api/permissions/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response && response.ok) {
        let result: ResponsePermissionApi = await response.json();
        return result;
      }
      console.log("Thất bại:", "ApiGetPermissionDetails");
    } catch (error) {
      console.log('Lỗi ApiGetPermissionDetails:', error)
    }
  }
  
  /**
   * Hảm thêm mới với api
   * @param Permissions thông tin được tạo
   * @returns 
   */
  export const ApiAddPermission = async (data: Permission) => {
    try {
      const formData = await ConvertFormData(data);
  
      const response = await fetch(`${domain}/api/permissions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response && response.ok) {
        const result: ResponsePermissionApi = await response.json();
        return result;
      }
      console.error('Thất bại:', "ApiAddPermission");
    } catch (error) {
      console.error('Lỗi ApiAddPermission:', error);
    }
  }
  
  /**
   * Api cập nhật Permission
   * @param Permissions 
   * @param file 
   * @returns 
   */
  export const ApiUpdatePermission = async (data: Permission, file: any) => {
    try {
      const formData = await ConvertFormData(data, file);
      const response = await fetch(`${domain}/api/permissions`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response && response.ok) {
        const result: ResponsePermissionApi = await response.json();
        return result;
      }
      console.error('Thất bại:', 'ApiUpdatePermission');
    } catch (error) {
      console.error('Lỗi ApiUpdatePermission:', error);
    }
  }
  
  /**
   * Xóa Permission
   * @param id id Permission
   * @returns 
   */
  export const ApiDeletedPermission = async (id: string) => {
    try {
      const response = await fetch(`${domain}/api/permissions/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response && response.ok) {
        const result: ResponsePermissionApi = await response.json();
        return result;
      }
      console.error('Thất bại:', 'ApiDeletedPermission');
    } catch (error) {
      console.error('Lỗi ApiDeletedPermission:', error);
    }
  }