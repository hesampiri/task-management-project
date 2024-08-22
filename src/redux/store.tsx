import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from './boardsSlice'
import themeReducer from './themSlice'

export const store = configureStore({
    reducer:{
        boards:boardsReducer,
        theme:themeReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch