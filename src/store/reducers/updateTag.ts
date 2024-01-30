/* eslint-disable import/prefer-default-export */
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../../utils/axios';
import { Tag, TagState } from '../../@types/tag';

const initialState: TagState = {
  tags: {
    id: '',
    name: '',
    user_id: 0,
  },
  isLoading: false,
  error: null,
};

export const updateTag = createAsyncThunk('updateStep', async (tag: Tag) => {
  const { data } = await axiosInstance.patch(`/tag/${tag.id}`, tag);
  return data;
});

const updateTagSlice = createSlice({
  name: 'updateTag',
  initialState,
  reducers: {
    changeInputTagValue(
      state,
      action: PayloadAction<{
        fieldName: keyof TagState['tags'];
        value: string;
      }>
    ) {
      const { fieldName, value } = action.payload;

      state.tags[fieldName] = value as never;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(updateTag.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateTag.rejected, (state) => {
        state.isLoading = false;
        state.error = 'Enregistrement rejeté';
      })
      .addCase(updateTag.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      });
  },
});

export const { changeInputTagValue } = updateTagSlice.actions;
export default updateTagSlice.reducer;
