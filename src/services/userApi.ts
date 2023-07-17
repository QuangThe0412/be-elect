import { ConvertFormData, domain, token } from './common';

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

export interface ResponseUserApi {
    code: number | null,
    mess: string | null,
    data: User[]
  };
  
  /**
   * Hàm lấy dữ liệu User từ api
   * @returns
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
  
  /**
   * Hàm lấy dữ liệu chi tiết
   * @returns 
   */
  export const ApiGetUserDetails = async (id: string) => {
    try {
      const response = await fetch(`${domain}/api/users/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response && response.ok) {
        let result: ResponseUserApi = await response.json();
        return result;
      }
      console.log("Thất bại:", "ApiGetUserDetails");
    } catch (error) {
      console.log('Lỗi ApiGetUserDetails:', error)
    }
  }
  
  /**
   * Hảm thêm mới với api
   * @param Users thông tin được tạo
   * @returns 
   */
  export const ApiAddUser = async (data: User) => {
    try {
      const formData = await ConvertFormData(data);
  
      const response = await fetch(`${domain}/api/users`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response && response.ok) {
        const result: ResponseUserApi = await response.json();
        return result;
      }
      console.error('Thất bại:', "ApiAddUser");
    } catch (error) {
      console.error('Lỗi ApiAddUser:', error);
    }
  }
  
  /**
   * Api cập nhật User
   * @param Users 
   * @param file 
   * @returns 
   */
  export const ApiUpdateUser = async (data: User, file: any) => {
    try {
      const formData = await ConvertFormData(data, file);
      const response = await fetch(`${domain}/api/users`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response && response.ok) {
        const result: ResponseUserApi = await response.json();
        return result;
      }
      console.error('Thất bại:', 'ApiUpdateUser');
    } catch (error) {
      console.error('Lỗi ApiUpdateUser:', error);
    }
  }
  
  /**
   * Xóa User
   * @param id id User
   * @returns 
   */
  export const ApiDeletedUser = async (id: string) => {
    try {
      const response = await fetch(`${domain}/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response && response.ok) {
        const result: ResponseUserApi = await response.json();
        return result;
      }
      console.error('Thất bại:', 'ApiDeletedUser');
    } catch (error) {
      console.error('Lỗi ApiDeletedUser:', error);
    }
  }