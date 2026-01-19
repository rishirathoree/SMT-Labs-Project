import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") as string) : {},
    token : localStorage.getItem("token") ? localStorage.getItem("token") : null,
    organizations:localStorage.getItem("organizations") ? JSON.parse(localStorage.getItem("organizations") as string) : {},
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        setAuth:(state,action) => {
            Object.assign(state,action.payload)
        }
    },
})

export const {setAuth} = authSlice.actions
export default authSlice.reducer