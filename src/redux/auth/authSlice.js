const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    user: null,
    token : null,
    isLoggedIn : false,
    loading : false,
    error: null
}

const authSlice = createSlice({
    name:"auth",
    initialState : initialState,
    reducers : {
        loginStart(state){
            state.loading= true;
            state.error= null
        },
        
        loginSucess(state, action){
            state.loading= false
            state.user= action.payload.user
            state.error=null
            state.token= action.payload.token
            state.isLoggedIn = true
        },
        loginFailure(state, action){
            state.loading= false,
            state.error=action.payload
        },
        logout(state){
            state.user = null
            state.token= null
            state.isLoggedIn= false
            state.loading= false
        },
        restoreSession(state, action){
            state.user = action.payload.user
            state.token = action.payload.token
            state.isLoggedIn= true
            state.loading = false
        }
    }
})

export const {
    loginStart,
    loginSucess,
    loginFailure,
    logout
} = authSlice.actions

export default authSlice.reducer