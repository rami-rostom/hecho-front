export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginState = {
  isLoading: boolean;
  error?: string;
  logged: boolean;
  username?: string;
  username_slug?: string;
  token?: string;
  refreshToken?: string;
  data: UserData;
  credentials: LoginCredentials;
};

export type UserData = {
  userId: number;
  username: string;
  username_slug: string;
  token: string;
  refreshToken: string;
  logged: boolean;
};

export type Register = {
  email: string;
  username: string;
  password: string;
  confirmation: string;
};

export type RegisterState = {
  register: Register;
  isLoading: boolean;
  error: null | string;
};
