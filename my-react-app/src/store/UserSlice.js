import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchUserData } from './userDataSlice';


export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (userCredentials) => {
      try {
        const response = await axios.post('http://localhost:3001/api/v1/user/login', userCredentials);
        console.log(response.data);
  
        if (response.status === 200) {
          const token = response.data.body.token;
          localStorage.setItem('token', token);
          console.log(token)
          return token;
        } else if (response.status === 400) {
          throw new Error('Invalid Fields');
        } else {
          throw new Error('Internal Server Error');
        }
      } catch (error) {
        throw error;
      }
    }
  );

const userSlice = createSlice({
    name:'user',
    initialState:{
        loading : false,
        user: null,
        error: null,
        token: null,
    },
    reducers: {
      logoutUser: (state) => {
        state.loading = false;
        state.user = null;
        state.error = null;
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
      },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(loginUser.pending,(state)=>{
            state.loading = true;
            state.user = null;
            state.error = null;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.user = action.payload;
            state.error = null;
            state.token = action.payload;
            console.log(state.token);
        })
        .addCase(loginUser.rejected,(state,action)=>{
            state.loading = false;
            state.user = null;
            console.log(action.error.message);
            if (action.error.message === 'Request failed with status code 401'){
                state.error = 'Access Denied! Invalid Credentials';
            }
            else {
                state.error = action.error.message;
            }
            
        })
    }
})
export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;