import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getUserSlug } from '../../../../../utils';
import { fetchFollowersAndFollowing } from '../../user/followers/followers.slice';
import { isForLoggedUser } from '../../utils';

const follow = createAsyncThunk('users/followers/follow', async function (
  userSlug = getUserSlug(),
  { rejectWithValue },
) {
  try {
    await axios.post(`/api/users/${userSlug}/follow`);
  } catch (err) {
    return rejectWithValue(err.toString());
  }
});

const unfollow = createAsyncThunk('users/followers/unfollow', async function (
  userSlug = getUserSlug(),
  { rejectWithValue },
) {
  try {
    await axios.delete(`/api/users/${userSlug}/unfollow`);
  } catch (err) {
    return rejectWithValue(err.toString());
  }
});

function followAndRefetch(params) {
  return async function (dispatch) {
    await dispatch(follow(params));
    await Promise.all([
      dispatch(fetchFollowersAndFollowing(params)),
      dispatch(fetchFollowersAndFollowing()),
    ]);
  };
}

function unfollowAndRefetch(params) {
  return async function (dispatch) {
    await dispatch(unfollow(params));
    await Promise.all([
      dispatch(fetchFollowersAndFollowing(params)),
      dispatch(fetchFollowersAndFollowing()),
    ]);
  };
}

const { reducer } = createSlice({
  extraReducers: {
    [fetchFollowersAndFollowing.fulfilled](state, action) {
      if (isForLoggedUser(action.meta.arg)) {
        return action.payload;
      }
      return state;
    },
  },
  initialState: {
    followers: [],
    following: [],
  },
  name: 'users/followers',
  reducers: {},
});

export { fetchFollowersAndFollowing, followAndRefetch, unfollowAndRefetch };
export default reducer;
