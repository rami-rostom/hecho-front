/* eslint-disable import/prefer-default-export */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import { NewTag, NewTagState } from '../../@types/tag';

const initialState: NewTagState = {
  tags: {
    name: '',
    user_id: 0,
  },
  isLoading: false,
  error: null,
};

export const createTag = createAsyncThunk(
  'createTag',
  async (newTag: NewTag) => {
    const { data } = await axiosInstance.post('/tag', newTag);
    return data;
  }
);

const createTagSlice = createSlice({
  name: 'createTag',
  initialState,
  reducers: {
    changeInputTagValue(
      state,
      action: PayloadAction<{
        fieldName: keyof NewTagState['tags'];
        value: string;
      }>
    ) {
      const { fieldName, value } = action.payload;

      state.tags[fieldName] = value as never;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createTag.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTag.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Enregistrement rejeté';
      })
      .addCase(createTag.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { changeInputTagValue } = createTagSlice.actions;
export default createTagSlice.reducer;
