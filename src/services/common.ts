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
      formData.append(capitalizedKey, value.toISOString());
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
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjY0NDc0MzJkNmMxYzQ0ZWVkOWE0NjI1OCIsInJvbGUiOiJhZG1pbiIsInBlcm1pc3Npb25zIjoiYWRtaW4iLCJuYmYiOjE2ODg5NTI4NzcsImV4cCI6MTY5MTU0NDg3NywiaWF0IjoxNjg4OTUyODc3fQ.Fwo0c90Fde_CxMMq2_CH7zRSZ-3i3PiehsXA03sD4KY';
export const domain = 'http://thedevapi.somee.com';
//export const domain = 'https://localhost:7027';

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