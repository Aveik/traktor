import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import {
  filterOutUnsupportedEntityTypes,
  getUserSlug,
} from '../../../../../utils';
import { isForLoggedUser } from '../../utils';

const fetchLists = createAsyncThunk('users/lists/fetch', async function (
  userSlug = getUserSlug(),
  { rejectWithValue },
) {
  try {
    const response = await axios.get(`/trakt/users/${userSlug}/lists`);
    const listItems = await Promise.all(
      response.data.map((list) =>
        axios.get(`/trakt/users/${userSlug}/lists/${list.ids.slug}/items`),
      ),
    );
    return response.data.map((list, index) => ({
      ...list,
      items: filterOutUnsupportedEntityTypes(listItems[index].data),
    }));
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const { reducer } = createSlice({
  extraReducers: {
    [fetchLists.fulfilled](state, action) {
      if (isForLoggedUser(action.meta.arg)) {
        return state;
      }
      return action.payload;
    },
  },
  initialState: [],
  name: 'users/lists',
  reducers: {},
});

export { fetchLists };
export default reducer;
