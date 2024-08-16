import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, postDelete, removePost } from "../../app/appSlices/postsSlice";
import AuthorPost from "./AuthorPost";
import AddPostForm from "./AddPostForm";
import ReactionBtns from "./ReactionBtns";
import { useEffect, useState } from "react";

const PostsList = () => {
    const posts = useSelector((store) => store.posts.posts);
    const status = useSelector((store) => store.posts.status);

    const dispatch=useDispatch();
    const [selectPost, setSelectPost]=useState(null);
    console.log(posts);

    useEffect(()=>{
        if (status=='idle'){
            dispatch(fetchPosts());
        }
    },[status]);


    let content;
    if (status==='loading') {
        content=<p>"Loading..."</p>;
    }
    else{
        content= posts.map(post => (
            <article key={post.id}>
                <h3>{post.title}</h3>
                <p> {post.body} ...</p>
                <p><AuthorPost userId={post.userId}/></p>
                <ReactionBtns post={post}/>
                {/* <button onClick={()=>dispatch(postDelete({id: post.id}))}>delete</button> */}
                <button onClick={()=>dispatch(removePost({id: post.id}))}>delete</button>
                <button onClick={()=>setSelectPost(post)}>Edit</button>
            </article>
        ))
    };
    
    return (
        <section>
            <h2>Add New Post</h2>
            <AddPostForm post={selectPost}/>
            <h2>Posts</h2>
            <hr />
            { content }

        </section>
    )
}
export default PostsList;
