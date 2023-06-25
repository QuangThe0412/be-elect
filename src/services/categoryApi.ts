import { ResponsePCategoriesApi, token } from "./common";

export interface Categories {
  id: string,
  name: string | null,
}

/**
 * Hàm lấy thể loại từ api
 * @returns Array từ api
 */
export const ApiGetCategories = async () => {
  try {
    const response = await fetch("http://thedevapi.somee.com/api/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response && response.ok) {
      let result: ResponsePCategoriesApi = await response.json();
      return result;
    }
    console.log("Thất bại:", "ApiGetCategories");
  } catch (error) {
    console.log('Lỗi ApiGetCategories:', error)
  }
}