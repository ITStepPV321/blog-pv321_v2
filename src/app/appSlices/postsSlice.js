import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = [
    {
        id: nanoid(),    //npm i nanoid
        title: "Introduction into Redux/Toolkit",
        content: "Welcome to the Redux Toolkit Quick Start tutorial! This tutorial will briefly introduce you to Redux Toolkit and teach you how to start using it correctly.",
        userId: 1,
        reactions:{
            thumbsUp:2,
            heart: 0,
            smiley: 1,
            thumbsDown:0,
       }
    },
    {
        id: nanoid(),    //npm i nanoid
        title: "Create a Redux Store",
        content: "Create a file named src/app/store.js. Import the configureStore API from Redux Toolkit",
        userId: 3,
        reactions:{
            thumbsUp:4,
            heart: 1,
            smiley: 1,
            thumbsDown:0,
       }
    }
];

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {  // "posts/action"
        postAdd: {
            reducer: (state, action) => {
                console.log(action.payload);
                state.push(action.payload);
            },
            prepare: (title, content, userId) => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId: parseInt(userId),
                        reactions:{
                            thumbsUp:0,
                            heart: 0,
                            smiley: 0,
                            thumbsDown:0,
                       }
                    }

                }
            }
        },
        postDelete: (state, action) => { //'post/postDelete
            console.log(action);
            const index = state.findIndex(post => post.id == action.payload.id);
            console.log(index);
            if (index !== -1) {
                state.splice(index, 1);
                console.log("Deleted!");
            }
        },
        postEdit:(state, action)=>{
            console.log(action.payload);
            const {id, title, userId, content}=action.payload;
            const existingPost=state.find(post=>post.id===id);
            if(existingPost){
                existingPost.title=title;
                existingPost.userId=parseInt(userId);
                existingPost.content=content;
            }

        },
        reactionAdd:(state,action)=>{
            const {postId, reaction}=action.payload;
            const existingPost=state.find(post=>post.id===postId);
            if(existingPost){
                existingPost.reactions[reaction]++;
            }

        }
    }
});

export const { postAdd, postDelete, reactionAdd, postEdit } = postsSlice.actions;
export default postsSlice.reducer;
