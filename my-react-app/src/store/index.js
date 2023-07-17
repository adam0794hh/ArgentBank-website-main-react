import {configureStore} from "@reduxjs/toolkit";
import userReducer from './UserSlice';
import userDataReducer from './userDataSlice';


const store = configureStore({
reducer: {
    user: userReducer,
    userData: userDataReducer,
}
})
export default store;