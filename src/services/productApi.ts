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

export const ApiGetProducts = async () => {

  const response = await fetch("http://thedevapi.somee.com/api/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  let json = await response.json();
  let _products: Product[] = json.data;
  return _products
}

export const ApiGetProductsDetails = async (id: number) => {
  const response = await fetch(`https://dummyjson.com/products/${id}`);
  return await response.json();
}

export const ApiAddProduct = async (products: Product, file: any) => {
  try {
    const formData = new FormData();

    for (const key of Object.keys(products) as Array<keyof Product>) {
      const value = products[key] as string | number | boolean | null | Date;
      //Bởi vì key gửi lên sẻ Viết hoa chữ cái đầu
      //Còn res nhận được thì không
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      formData.append(capitalizedKey, String(value) || '');
    }
    //Gởi lên hình ảnh
    formData.append('file', file.files[0]);
    
    const response = await fetch("http://thedevapi.somee.com/api/products", {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const result: ResponseProductApi = await response.json();
      console.log(result)
      return result;
    } else {
      console.error('Failed to add product.');
    }

  } catch (error) {
    console.error('Error creating product:', error);
  }
}