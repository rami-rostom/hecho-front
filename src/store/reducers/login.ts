import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import { LocalStorage } from '../../utils/LocalStorage';

import { LoginCredentials, LoginState, UserData } from '../../@types/auth';

const userLoginData = localStorage.getItem('user');
let userData: UserData | null = null;

if (userLoginData) {
  userData = JSON.parse(userLoginData);
}

export const initialState: LoginState = {
  isLoading: false,
  logged: false,
  credentials: {
    email: 'ramirez@hecho.io',
    password: 'Password1!',
  },
  data: {
    userId: 0,
    username: '',
    token: '',
    refreshToken: '',
    logged: false,
  },
  ...userData,
};

export const login = createAsyncThunk(
  'user/login',
  async (credentials: LoginCredentials) => {
    const { data } = await axiosInstance.post<UserData>('/signin', credentials);

    LocalStorage.setItem('user', data);

    return data;
  }
);

const loginReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeInputLoginValue(
      state,
      action: PayloadAction<{
        value: string;
        field: keyof LoginState['credentials'];
      }>
    ) {
      const { value, field } = action.payload;
      state.credentials[field] = value;
    },
    logOut(state) {
      LocalStorage.removeItem('user');
      state.logged = false;
      state.token = undefined;
      state.refreshToken = undefined;
      state.username = undefined;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(login.rejected, (state) => {
        state.error = 'Email ou mot de passe incorrect';
        state.isLoading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.logged = true;

        const response = action.payload;

        const authData = {
          data: {
            userId: response.userId,
            username: response.username,
            token: response.token,
            refreshToken: response.refreshToken,
          },
          logged: true,
        };

        LocalStorage.setItem('user', authData);
      });
  },
});

export const { changeInputLoginValue, logOut } = loginReducer.actions;
export default loginReducer.reducer;
