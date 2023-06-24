import { Product } from "./productApi";

export interface ResponseProductApi {
    code: number | null,
    mess: string | null,
    data: Product[]
  };
  
export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjY0NDc0MzJkNmMxYzQ0ZWVkOWE0NjI1OCIsInJvbGUiOiJhZG1pbiIsInBlcm1pc3Npb25zIjoiYWRtaW4iLCJuYmYiOjE2ODYyMDY3MTQsImV4cCI6MTY4ODc5ODcxNCwiaWF0IjoxNjg2MjA2NzE0fQ.yj7ObEhYrbayJMayGORK-jdGUwLVYzK5_bDnUJRFxsY';

const createId = (): string => {
  let id = '';
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
};