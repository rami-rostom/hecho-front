/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Hecho, HechoState } from '../../@types/hecho';
import { axiosInstance } from '../../utils/axios';

const initialState: HechoState = {
  hecho: {
    id: '',
    hecho: false,
    date_accomplished: '',
  },
  isLoading: false,
  error: null,
};

export const hecho = createAsyncThunk('hecho', async (updatedData: Hecho) => {
  const { data } = await axiosInstance.patch(
    `/workout/${updatedData.id}`,
    updatedData
  );

  return data;
});

const hechoSlice = createSlice({
  name: 'hecho',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(hecho.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(hecho.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Enregistrement rejeté';
      })
      .addCase(hecho.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default hechoSlice.reducer;
