export interface User {
  userName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  dateOfBirth: Date;
  gender: string;
  role: number;
  phoneNumber?: string;
}
