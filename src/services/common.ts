/**
 * Tạo formData và Upercase chữ cái đầu cho từng key
 */
export const ConvertFormData = async (data: any, file?: any) => {
  const formData = new FormData();
  const date = new Date();

  for (const key of Object.keys(data)) {
    let value = data[key];
    const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);

    if (value instanceof Date) {
      formData.append(capitalizedKey, date.toISOString());
    } else {
      formData.append(capitalizedKey, String(value) || '');
    }
  }

  if (file) {
    formData.append('file', file.files[0]);
  }

  return formData;
};


/**
 * Tooken test
 */
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjY0NDc0MzJkNmMxYzQ0ZWVkOWE0NjI1OCIsInJvbGUiOiJhZG1pbiIsInBlcm1pc3Npb25zIjpbImFkbWluIiwicmVhZCJdLCJuYmYiOjE2OTAxNzMzNzYsImV4cCI6MTY5Mjc2NTM3NiwiaWF0IjoxNjkwMTczMzc2fQ.tPMGwf_wvUB1O5XpR7Nmlu67SsPquaLlZb6tTgua1FQ';
// export const domain = 'http://thedevapi.somee.com';
export const domain = 'https://shjno190.bsite.net';
// export const domain = 'https://localhost:7027';

/**
 * Hàm tạo id ngẫu nhiên
 * @returns Chuỗi 4 ký tự ngẫu nhiên
 */
const createId = (): string => {
  let id = '';
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};

export const capitalizeKeys = (obj: any): Record<string, any> => {
  const convertedObj: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
      convertedObj[capitalizedKey] = obj[key];
    }
  }

  return convertedObj;
};