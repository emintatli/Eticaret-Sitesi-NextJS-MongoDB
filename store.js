import { createSlice,configureStore } from "@reduxjs/toolkit";

const navbarState={
    loggedIn:false,
    sepet:[]
};
const navbarSlice=createSlice({
    name:"navbar",
    initialState:navbarState,
    reducers:{
        auth(state,action){
            state.loggedIn=action.payload.value;
            
        },
        sepet_ekle(state,action){
            state.sepet.push(action.payload.urun)
        },
        sepet_yukle(state,action){
            state.sepet=action.payload.urun
        }
        
       
       
       
    }
});

const store =configureStore({
    reducer:{navbar:navbarSlice.reducer},

});

export const navbarActions=navbarSlice.actions;
export default store;