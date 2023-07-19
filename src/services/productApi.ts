import { FileUploadState } from "primereact/fileupload";
import { ConvertFormData, domain, token } from "./common";

export interface Product {
  id: string,
  idCategory: string | '',
  name: string | '',
  brand: string | '',
  unsignedName: string | '',
  idFake: string | '',
  unit: string | '',
  image: string | '',
  importPrice: number,
  wholeSalePrice: number,
  quantity: number,
  retailPrice: number,
  numberImport: number,
  description: string | '',
  warrantyTime: number,
  dateFix: Date | null,
  dateCreate: Date | null,
};

export interface ResponseProductApi {
  code: number | null,
  mess: string | null,
  data: Product[]
};

/**
 * Hàm lấy dữ liệu sản phẩm từ api
 * @returns Array sản phẩm từ api
 */
export const ApiGetProducts = async () => {
  try {
    const response = await fetch(`${domain}/api/products`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response && response.ok) {
      let result: ResponseProductApi = await response.json();
      return result;
    }
    console.log("Thất bại:", "ApiGetProducts");
  } catch (error) {
    console.log('Lỗi ApiGetProducts:', error)
  }
}

/**
 * Hàm lấy dữ liệu chi tiết sản phẩm từ api
 * @returns Chi tiết sản phẩm từ api
 */
export const ApiGetProductsDetails = async (id: string) => {
  try {
    const response = await fetch(`${domain}/api/products/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response && response.ok) {
      let result: ResponseProductApi = await response.json();
      return result;
    }
    console.log("Thất bại:", "ApiGetProductsDetails");
  } catch (error) {
    console.log('Lỗi ApiGetProductsDetails:', error)
  }
}

/**
 * Hảm thêm mới sản phẩm với api
 * @param products thông tin sản phẩm được tạo
 * @param file file hình ảnh
 * @returns 
 */
export const ApiAddProduct = async (products: Product, file: any) => {
  try {
    const formData = await ConvertFormData(products, file);

    const response = await fetch(`${domain}/api/products`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response && response.ok) {
      const result: ResponseProductApi = await response.json();
      return result;
    }
    console.error('Thất bại:', "ApiAddProduct");
  } catch (error) {
    console.error('Lỗi ApiAddProduct:', error);
  }
}

/**
 * Api cập nhật sản phẩm
 * @param products 
 * @param file 
 * @returns 
 */
export const ApiUpdateProduct = async (products: Product, file: any) => {
  try {
    const formData = await ConvertFormData(products, file);
    const response = await fetch(`${domain}/api/products`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response && response.ok) {
      const result: ResponseProductApi = await response.json();
      return result;
    }
    console.error('Thất bại:', 'ApiUpdateProduct');
  } catch (error) {
    console.error('Lỗi ApiUpdateProduct:', error);
  }
}

/**
 * Xóa nhiều sản phẩm
 * @param ids mãng id sản phẩm
 * @returns 
 */
export const ApiDeletedProducts = async (ids: string) => {
  if (ids && ids.length > 0) {
    try {
      const formData = new FormData();
      formData.append('ids', ids);

      const response = await fetch(`${domain}/api/products/multiple`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response && response.ok) {
        const result: ResponseProductApi = await response.json();
        return result;
      }
      console.error('Thất bại:', 'ApiDeletedProducts');
    } catch (error) {
      console.error('Lỗi ApiDeletedProducts:', error);
    }
  }
}

/**
 * xóa sản phẩm
 * @param id id sản phẩm
 * @returns 
 */
export const ApiDeletedProduct = async (id: string) => {
  try {
    const response = await fetch(`${domain}/api/products/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response && response.ok) {
      const result: ResponseProductApi = await response.json();
      return result;
    }
    console.error('Thất bại:', 'ApiDeletedProduct');
  } catch (error) {
    console.error('Lỗi ApiDeletedProduct:', error);
  }
}

