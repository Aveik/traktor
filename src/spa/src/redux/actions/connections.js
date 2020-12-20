import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import { fetchConnections } from '../app/connections/connections.slice';

const follow = createAsyncThunk('users/followers/follow', async function (
  userSlug,
  { rejectWithValue },
) {
  try {
    await axios.post(`/api/users/${userSlug}/follow`);
  } catch (err) {
    return rejectWithValue(err.toString());
  }
});

const unfollow = createAsyncThunk('users/followers/unfollow', async function (
  userSlug,
  { rejectWithValue },
) {
  try {
    await axios.delete(`/api/users/${userSlug}/unfollow`);
  } catch (err) {
    return rejectWithValue(err.toString());
  }
});

function followAndFetch(params) {
  return async function (dispatch) {
    await dispatch(follow(params));
    await dispatch(fetchConnections());
  };
}

function unfollowAndFetch(params) {
  return async function (dispatch) {
    await dispatch(unfollow(params));
    await dispatch(fetchConnections());
  };
}

export { follow, followAndFetch, unfollow, unfollowAndFetch };
