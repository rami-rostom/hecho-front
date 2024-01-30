/* eslint-disable import/prefer-default-export */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import { Register, RegisterState } from '../../@types/auth';

const initialState: RegisterState = {
  register: {
    email: '',
    username: '',
    password: '',
    confirmation: '',
  },
  isLoading: false,
  error: null,
};

export const register = createAsyncThunk(
  'register',
  async (register: Register) => {
    const { data } = await axiosInstance.post('/signup', register);
    return data;
  }
);

const registerSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    changeInputRegisterValue(
      state,
      action: PayloadAction<{
        fieldName: keyof RegisterState['register'];
        value: string;
      }>
    ) {
      const { fieldName, value } = action.payload;

      state.register[fieldName] = value as never;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Enregistrement rejeté';
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { changeInputRegisterValue } = registerSlice.actions;
export default registerSlice.reducer;
