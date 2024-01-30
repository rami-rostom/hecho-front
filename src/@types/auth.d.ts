export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginState = {
  isLoading: boolean;
  error?: string;
  logged: boolean;
  username?: string;
  token?: string;
  refreshToken?: string;
  data: UserData;
  credentials: LoginCredentials;
};

export type UserData = {
  userId: number;
  username: string;
  token: string;
  refreshToken: string;
  logged: boolean;
};
