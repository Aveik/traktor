import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getUserSlug } from '../../../../utils';

const fetchLists = createAsyncThunk('profile/lists/fetch', async function (
  type,
  { rejectWithValue },
) {
  try {
    const response = await axios.get(`/trakt/users/${getUserSlug()}/lists`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const { reducer } = createSlice({
  extraReducers: {
    [fetchLists.fulfilled](state, action) {
      return action.payload;
    },
  },
  initialState: [],
  name: 'profile/lists',
  reducers: {},
});

export { fetchLists };
export default reducer;
