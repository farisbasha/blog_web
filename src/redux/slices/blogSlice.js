import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


const initialState = {
    blogsList:[],
    isLoading:false,
    isError:false,
    errorMessage:""
}


export const getBlogs = createAsyncThunk("blogs/getBlogs",async()=>{
    const response = await axios.get("http://localhost:3000/blogs/")
    return response.data
})


const blogSlice = createSlice({
    name:"blogs",
    initialState,
    reducers:{
    
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getBlogs.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getBlogs.fulfilled,(state,action)=>{
            state.isLoading = false
            state.blogsList = action.payload
        })
        .addCase(getBlogs.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.errorMessage = action.error.message
        })
    }
})

export default blogSlice.reducer