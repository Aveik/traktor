import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getUserSlug } from '../../../../utils';
import { fetchLists } from '../lists/lists.slice';

const fetchList = createAsyncThunk('profile/list/fetch', async function (
  id,
  { rejectWithValue },
) {
  try {
    const [listResponse, itemsResponse] = await Promise.all([
      axios.get(`/trakt/users/${getUserSlug()}/lists/${id}`),
      axios.get(`/trakt/users/${getUserSlug()}/lists/${id}/items`),
    ]);
    return {
      ...listResponse.data,
      items: itemsResponse.data,
    };
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const removeFromList = createAsyncThunk('profile/list/remove', async function (
  { entity, listSlug, slug },
  { rejectWithValue },
) {
  try {
    await axios.post(
      `/trakt/users/${getUserSlug()}/lists/${listSlug}/items/remove`,
      {
        [entity]: [{ ids: { slug } }],
      },
    );
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

const addToList = createAsyncThunk('profile/list/add', async function (
  { entity, listSlug, slug },
  { rejectWithValue },
) {
  try {
    await axios.post(`/trakt/users/${getUserSlug()}/lists/${listSlug}/items`, {
      [entity]: [{ ids: { slug } }],
    });
  } catch (error) {
    return rejectWithValue(error.toString());
  }
});

function addToListAndRefetch(args) {
  return async function (dispatch) {
    await dispatch(addToList(args));
    await dispatch(fetchLists());
  };
}

function removeFromListAndRefetch(args) {
  return async function (dispatch) {
    await dispatch(removeFromList(args));
    await dispatch(fetchLists());
  };
}

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

export { addToListAndRefetch, fetchList, removeFromListAndRefetch };
export default reducer;
