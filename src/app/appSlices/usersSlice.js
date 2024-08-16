import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const BASE_URL="https://jsonplaceholder.typicode.com/users";

// export const initialState=[
//     {id: 1, fullname:"Walter Sckot"},
//     {id: 2, fullname:"Walter White"},
//     {id: 3, fullname:"Winsten Cherchel"},
// ];

export const fetchUsers=createAsyncThunk('users/fetchUsers',
async ()=>{
    const respons=await fetch(BASE_URL);
    const data=await respons.json();
    return data;
}); 

const usersSlice=createSlice({
    name:"users",
    initialState:[],
    reducers:{
    },
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled, (state,action)=>{
            return action.payload;
        })
    }
});

export default usersSlice.reducer;