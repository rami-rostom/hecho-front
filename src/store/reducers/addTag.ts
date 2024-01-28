/* eslint-disable import/prefer-default-export */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import { TagState } from '../../@types/tag';

const initialState: TagState = {
  tags: [],
  isLoading: false,
  error: null,
};

export const addTag = createAsyncThunk(
  'addTag',
  // TODO: change any type for stepId
  async (tagId: any) => {
    const { data } = await axiosInstance.patch(
      `/workout/${tagId.workoutId}/tag/add`,
      tagId
    );

    return data;
  }
);

const addTagSlice = createSlice({
  name: 'addTag',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addTag.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addTag.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Enregistrement rejeté';
      })
      .addCase(addTag.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export default addTagSlice.reducer;
