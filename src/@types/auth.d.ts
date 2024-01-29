export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoginState = {
  isLoading: boolean;
  error?: string;
  logged: boolean;
  pseudo?: string;
  token?: string;
  credentials: LoginCredentials;
};

export type UserData = {
  pseudo: string;
  token: string;
  logged: boolean;
};
