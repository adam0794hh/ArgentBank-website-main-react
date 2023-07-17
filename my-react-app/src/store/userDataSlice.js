import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchUserData = createAsyncThunk('userData/fetchUserData', async (_, { getState }) => {
  try {
    const token = getState().user.token;
    console.log(token)
    const response = await axios.post('http://localhost:3001/api/v1/user/profile', null, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateUsername = createAsyncThunk('userData/updateUsername', async (username, { getState }) => {
  try {
    const token = getState().user.token;
    console.log(token)
    console.log({ userName: username.userName })
    const response = await axios.put(
      'http://localhost:3001/api/v1/user/profile',
      { userName: username.userName },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
});


const userDataSlice = createSlice({
    name: 'userData',
    initialState: {
      loading: false,
      userData: null,
      error: null,
    },
    reducers: {
      restoreUserData: (state) => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
          state.userData = JSON.parse(storedUserData);
        }
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchUserData.pending, (state) => {
          state.loading = true;
          state.userData = null;
          state.error = null;
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {
          state.loading = false;
          state.userData = action.payload;
          state.error = null;
          localStorage.setItem('userData', JSON.stringify(action.payload));
          console.log(state);
        })
        .addCase(fetchUserData.rejected, (state, action) => {
          state.loading = false;
          state.userData = null;
          state.error = action.error.message;
        })
        .addCase(updateUsername.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateUsername.fulfilled, (state, action) => {
          state.loading = false;
          state.userData.body.userName = action.payload.body.userName;
          localStorage.setItem('userData', JSON.stringify(state.userData));
        })
        .addCase(updateUsername.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        })
    },
  });
  
export const { actions: userDataActions, reducer: userDataReducer } = userDataSlice;
export const { restoreUserData } = userDataSlice.actions;
export default userDataReducer;