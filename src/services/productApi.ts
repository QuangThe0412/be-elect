export interface Product {
    id: string,
    idCategory: string | null,
    name: string,
    brand: string,
    unsignedName: string,
    idFake: string,
    unit: string,
    image:string | null,
    importPrice: number,
    wholeSalePrice: number,
    retailPrice: number,
    numberImport: number,
    discount: number,
    warrantyTime: number,
    dateCreate: null | Date,
    dateFix: null | Date,
};

export interface Categories {
    id: string,
    name: string | null,
    dateCreate: null | Date,
    dateFix: null | Date,
}

interface ResponseProductApi {
    code: number | null,
    mess: string | null,
    data: Product[]
};

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjY0NDc0MzJkNmMxYzQ0ZWVkOWE0NjI1OCIsInJvbGUiOiJhZG1pbiIsInBlcm1pc3Npb25zIjoiYWRtaW4iLCJuYmYiOjE2ODYyMDY3MTQsImV4cCI6MTY4ODc5ODcxNCwiaWF0IjoxNjg2MjA2NzE0fQ.yj7ObEhYrbayJMayGORK-jdGUwLVYzK5_bDnUJRFxsY';

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

export const ApiGetCategories = async () => {

    const response = await fetch("http://thedevapi.somee.com/api/categories", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    let json = await response.json();
    let _categories: Categories[] = json.data;
    return _categories
}

export const ApiGetProductsDetails = async (id: number) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    return await response.json();
}
