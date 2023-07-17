import { ConvertFormData, domain, token } from "./common";

export interface Category {
  id: string,
  name: string | null,
}

export interface ResponseCategoriesApi {
  code: number | null,
  mess: string | null,
  data: Category[]
};

  /**
   * Hàm lấy dữ liệu Category từ api
   * @returns
   */
  export const ApiGetcategories = async () => {
    try {
      const response = await fetch(`${domain}/api/categories`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response && response.ok) {
        let result: ResponseCategoriesApi = await response.json();
        return result;
      }
      console.log("Thất bại:", "ApiGetcategories");
    } catch (error) {
      console.log('Lỗi ApiGetcategories:', error)
    }
  }
  
  /**
   * Hàm lấy dữ liệu chi tiết
   * @returns 
   */
  export const ApiGetCategoryDetails = async (id: string) => {
    try {
      const response = await fetch(`${domain}/api/categories/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response && response.ok) {
        let result: ResponseCategoriesApi = await response.json();
        return result;
      }
      console.log("Thất bại:", "ApiGetCategoryDetails");
    } catch (error) {
      console.log('Lỗi ApiGetCategoryDetails:', error)
    }
  }
  
  /**
   * Hảm thêm mới với api
   * @param categories thông tin được tạo
   * @returns 
   */
  export const ApiAddCategory = async (data: Category) => {
    try {
      const formData = await ConvertFormData(data);
  
      const response = await fetch(`${domain}/api/categories`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response && response.ok) {
        const result: ResponseCategoriesApi = await response.json();
        return result;
      }
      console.error('Thất bại:', "ApiAddCategory");
    } catch (error) {
      console.error('Lỗi ApiAddCategory:', error);
    }
  }
  
  /**
   * Api cập nhật Category
   * @param categories 
   * @param file 
   * @returns 
   */
  export const ApiUpdateCategory = async (data: Category, file: any) => {
    try {
      const formData = await ConvertFormData(data, file);
      const response = await fetch(`${domain}/api/categories`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response && response.ok) {
        const result: ResponseCategoriesApi = await response.json();
        return result;
      }
      console.error('Thất bại:', 'ApiUpdateCategory');
    } catch (error) {
      console.error('Lỗi ApiUpdateCategory:', error);
    }
  }
  
  /**
   * Xóa Category
   * @param id id Category
   * @returns 
   */
  export const ApiDeletedCategory = async (id: string) => {
    try {
      const response = await fetch(`${domain}/api/categories/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response && response.ok) {
        const result: ResponseCategoriesApi = await response.json();
        return result;
      }
      console.error('Thất bại:', 'ApiDeletedCategory');
    } catch (error) {
      console.error('Lỗi ApiDeletedCategory:', error);
    }
  }