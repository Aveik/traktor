import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchList = createAsyncThunk('list/fetch', async function (
  id,
  { rejectWithValue },
) {
  try {
    const [listResponse, itemsResponse] = await Promise.all([
      axios.get(`/lists/${id}`),
      axios.get(`/lists/${id}/items`),
    ]);
    return {
      ...listResponse.data,
      items: itemsResponse.data,
    };
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const { reducer } = createSlice({
  extraReducers: {
    [fetchList.fulfilled](state, action) {
      return action.payload;
    },
  },
  initialState: {
    items: [],
  },
  name: 'list',
  reducers: {},
});

export { fetchList };
export default reducer;
