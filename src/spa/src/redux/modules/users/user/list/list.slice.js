import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import {
  filterOutUnsupportedEntityTypes,
  getUserSlug,
} from '../../../../../utils';
import { isForLoggedUser } from '../../utils';

const fetchList = createAsyncThunk('users/list/fetch', async function (
  { id, userSlug = getUserSlug() },
  { rejectWithValue },
) {
  try {
    const [listResponse, itemsResponse] = await Promise.all([
      axios.get(`/trakt/users/${userSlug}/lists/${id}`),
      axios.get(`/trakt/users/${userSlug}/lists/${id}/items?extended=full`),
    ]);
    return {
      ...listResponse.data,
      items: filterOutUnsupportedEntityTypes(itemsResponse.data),
    };
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const { reducer } = createSlice({
  extraReducers: {
    [fetchList.fulfilled](state, action) {
      if (isForLoggedUser(action.meta.arg.userSlug)) {
        return state;
      }
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
