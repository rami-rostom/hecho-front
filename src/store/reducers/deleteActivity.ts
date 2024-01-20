/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';

const initialState = {};

export const deleteActivity = createAsyncThunk(
  'deleteActivity',
  async (id: string) => {
    const { data } = await axiosInstance.delete(`/workout/${id}`);

    return data;
  }
);

const deleteActivitySlice = createSlice({
  name: 'deleteActivity',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(deleteActivity.fulfilled, () => {
      console.log('Activity deleted');
    });
  },
});

export default deleteActivitySlice.reducer;
