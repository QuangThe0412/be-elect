import { FileUploadState } from "primereact/fileupload";
import { ResponseProductApi, token } from "./common";

export interface Product {
  id: string | '',
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
};

/**
 * Hàm lấy dữ liệu sản phẩm từ api
 * @returns Array sản phẩm từ api
 */
export const ApiGetProducts = async () => {
  try {
    const response = await fetch("http://thedevapi.somee.com/api/products", {
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
export const ApiGetProductsDetails = async (id: number) => {
  try {
    const response = await fetch(`http://thedevapi.somee.com/api/products/${id}`, {
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
    const formData = new FormData();

    for (const key of Object.keys(products) as Array<keyof Product>) {
      const value = products[key] as string | number | boolean | null | Date;
      //Bởi vì key gửi lên sẻ Viết hoa chữ cái đầu
      //Còn response nhận được thì không
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      formData.append(capitalizedKey, String(value) || '');
    }
    //Gởi lên hình ảnh sẽ được lưu ở gg drive
    formData.append('file', file.files[0]);

    const response = await fetch("http://thedevapi.somee.com/api/products", {
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