import { token } from "./common";

export interface Categories {
    id: string,
    name: string | null,
    dateCreate: null | Date,
    dateFix: null | Date,
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