import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const BASE_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = createAsyncThunk("posts/fetchPost", async () => {
    //   return fetch("https://jsonplaceholder.typicode.com/posts")
    //     .then((response) => response.json())
    //     .then((json) => console.log(json));
    const respons = await fetch(BASE_URL);
    const data = await respons.json();
    console.log(data);
    return data;
});

// export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
//     const response = await axios.get(BASE_URL)
//     return response.data
// })

export const removePost = createAsyncThunk("posts/removePost", async ({ id }) => {
    //   return fetch("https://jsonplaceholder.typicode.com/posts")
    //     .then((response) => response.json())
    //     .then((json) => console.log(json));
    try {
        const response = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
        if (response?.status === 200) return { id };
        return `${response.status} : ${response.statusText}`;
    } catch (error) {
        return error.message;
    }
});

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    // console.log(initialPost);
    const response = await fetch(BASE_URL,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(initialPost)
      }); 
    return response.json();
})

const initialState = {
    posts: [],
    status: 'idle',
    error: ''
};
// const initialState = [
//     {
//         id: nanoid(),    //npm i nanoid
//         title: "Introduction into Redux/Toolkit",
//         content: "Welcome to the Redux Toolkit Quick Start tutorial! This tutorial will briefly introduce you to Redux Toolkit and teach you how to start using it correctly.",
//         userId: 1,
//         reactions:{
//             thumbsUp:2,
//             heart: 0,
//             smiley: 1,
//             thumbsDown:0,
//        }
//     },
//     {
//         id: nanoid(),    //npm i nanoid
//         title: "Create a Redux Store",
//         content: "Create a file named src/app/store.js. Import the configureStore API from Redux Toolkit",
//         userId: 3,
//         reactions:{
//             thumbsUp:4,
//             heart: 1,
//             smiley: 1,
//             thumbsDown:0,
//        }
//     }
// ];

export const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        // "posts/action"
        // postAdd: {
        //     reducer: (state, action) => {
        //         console.log(action.payload);
        //         state.push(action.payload);
        //     },
        //     prepare: (title, content, userId) => {
        //         return {
        //             payload: {
        //                 id: nanoid(),
        //                 title,
        //                 content,
        //                 userId: parseInt(userId),
        //             },
        //         };
        //     },
        // },
        // postDelete: (state, action) => {
        //     //'post/postDelete
        //     console.log(action);
        //     const index = state.findIndex((post) => post.id == action.payload.id);
        //     console.log(index);
        //     if (index !== -1) {
        //         state.splice(index, 1);
        //         console.log("Deleted!");
        //     }
        // },
        // postEdit: (state, action) => {
        //     console.log(action.payload);
        //     const { id, title, userId, content } = action.payload;
        //     const existingPost = state.find((post) => post.id === id);
        //     if (existingPost) {
        //         existingPost.title = title;
        //         existingPost.userId = parseInt(userId);
        //         existingPost.content = content;
        //     }
        // },
        reactionAdd: (state, action) => {
            const { postId, reaction } = action.payload;
            const existingPost = state.posts.find((post) => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchPosts.pending, (state) => {
            state.status = "loading";
            console.log("loading");
            //handler isloading
        })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                console.log("succeded");
                // state.users=action.payload;
                state.status = "succeded";
                const loadedPosts = action.payload.map(post => {
                    post.reactions = {
                        thumbsUp: 0,
                        heart: 0,
                        smiley: 0,
                        thumbsDown: 0,
                    }
                    return post;
                });
                state.posts = state.posts.concat(loadedPosts);
                console.log(state.posts);

            })

            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message
            })
            .addCase(removePost.fulfilled, (state, action) => {
                // console.log(action.payload);
                if (!action?.payload.id) {
                    console.log("could not delete");
                    // console.log(action.payload)
                    return
                }

                const { id } = action.payload;
                const OldPosts = state.posts.filter(post =>
                    post.id !== id)
                state.posts = OldPosts
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                // console.log(state.posts.length);
                // console.log(action.payload);
                action.payload.id = state.posts[state.posts.length - 1].id + 1;
                // End fix for fake API post IDs 
                action.payload.userId = Number(action.payload.userId)
                // action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    heart: 0,
                    smiley: 0,
                    thumbsDown: 0
                }
                console.log(action.payload)
                state.posts.push(action.payload)
            })

    }
});

export const { postAdd, postDelete, reactionAdd, postEdit } = postsSlice.actions;
export default postsSlice.reducer;