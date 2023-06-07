import { useState } from "react";

export interface Product {
    id: string | null;
    code: string;
    name: string;
    description: string;
    image: string | null;
    price: number;
    category: string | null;
    quantity: number;
    inventoryStatus: string;
    rating: number;
};

const ApiGetProducts = async () => {
    const response = await fetch("./product.json");
    let json = await response.json();
    //let _products: Product[] = json.products;
    return json
}

export const ApiGetProductsDetails = async (id:number) => {
    const response = await fetch(`https://dummyjson.com/products/${id}`);
    return await response.json();
}

export default ApiGetProducts