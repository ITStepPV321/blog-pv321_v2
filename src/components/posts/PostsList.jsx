import { useSelector, useDispatch } from "react-redux";
import { postDelete } from "../../app/appSlices/postsSlice";
import AuthorPost from "./AuthorPost";
import AddPostForm from "./AddPostForm";
import ReactionBtns from "./ReactionBtns";
import { useState } from "react";

const PostsList = () => {
    const posts = useSelector((store) => store.posts);
    const dispatch=useDispatch();
    const [selectPost, setSelectPost]=useState(null);
    // console.log(posts);
    
    return (
        <section>
            <h2>Add New Post</h2>
            <AddPostForm post={selectPost}/>
            <h2>Posts</h2>
            <hr />
            {
                posts.map(post => (
                    <article key={post.id}>
                        <h3>{post.title}</h3>
                        <p> {post.content} ...</p>
                        <p><AuthorPost userId={post.userId}/></p>
                        <ReactionBtns post={post}/>
                        <button onClick={()=>dispatch(postDelete({id: post.id}))}>delete</button>
                        <button onClick={()=>setSelectPost(post)}>Edit</button>
                    </article>
                ))
            }

        </section>
    )
}
export default PostsList;
