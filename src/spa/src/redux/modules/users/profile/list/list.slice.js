import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getUserSlug, transformEntityToSingular } from '../../../../../utils';
import { fetchList } from '../../user/list/list.slice';
import { fetchLists } from '../../user/lists/lists.slice';
import { isForLoggedUser } from '../../utils';

const removeFromList = createAsyncThunk('users/list/remove', async function (
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

const addToList = createAsyncThunk('users/list/add', async function (
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

function addToListAndRefetch(params) {
  return async function (dispatch) {
    await dispatch(addToList(params));
    await dispatch(fetchLists());
  };
}

function removeFromListAndRefetch(params) {
  return async function (dispatch) {
    await dispatch(removeFromList(params));
    await dispatch(fetchLists());
  };
}

const { reducer } = createSlice({
  extraReducers: {
    [fetchList.fulfilled](state, action) {
      if (isForLoggedUser(action.meta.arg.userSlug)) {
        return action.payload;
      }
      return state;
    },
    [removeFromList.fulfilled](state, action) {
      const { entity, listSlug, slug } = action.meta.arg;
      if (state.ids?.slug === listSlug) {
        state.items = state.items.filter(
          (item) =>
            item.type !== entity &&
            item[transformEntityToSingular(entity)].ids.slug !== slug,
        );
      }
      return state;
    },
  },
  initialState: {
    items: [],
  },
  name: 'users/list',
  reducers: {},
});

export { addToListAndRefetch, fetchList, removeFromListAndRefetch };
export default reducer;
