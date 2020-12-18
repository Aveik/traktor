import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { getUserSlug } from '../../../../../utils';
import { isForLoggedUser } from '../../utils';

const fetchFollowersAndFollowing = createAsyncThunk(
  'users/followers/fetch',
  async function (userSlug = getUserSlug(), { rejectWithValue }) {
    try {
      const [followersResponse, followingResponse] = await Promise.all([
        axios.get(`/api/users/${userSlug}/followers`),
        axios.get(`/api/users/${userSlug}/following`),
      ]);
      return {
        followers: followersResponse.data,
        following: followingResponse.data,
      };
    } catch (err) {
      return rejectWithValue(err.toString());
    }
  },
);

const { reducer } = createSlice({
  extraReducers: {
    [fetchFollowersAndFollowing.fulfilled](state, action) {
      if (isForLoggedUser(action.meta.arg)) {
        return state;
      }
      return action.payload;
    },
  },
  initialState: {
    followers: [],
    following: [],
  },
  name: 'users/followers',
  reducers: {},
});

export { fetchFollowersAndFollowing };
export default reducer;
