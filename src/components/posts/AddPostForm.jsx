import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { postAdd,postEdit } from "../../app/appSlices/postsSlice";


const AddPostForm = ({post}) => {
    const users = useSelector(store => store.users);
    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [userId, setUserId] = useState(0);
    const [id, setId] = useState(null);

    const handlerTitleChange = event => setTitle(event.target.value);
    const handlerContentChange = event => setContent(event.target.value);
    const handlerAuthorChange = event => setUserId(event.target.value);

    useEffect(()=>{
        if (post){
            setTitle(post.title);
            setContent(post.content);
            setUserId(post.userId);
            setId(post.id);
        }
    },[post]);

    const handlerSubmit = (event) => {
        event.preventDefault();
        console.log(title);
        if (post&&title&&content){
            // dispatch(postEdit({id: id,title:title,userId:userId,content:content}));
            dispatch(postEdit({id,title,userId,content}));
        }else
        if (title && content){
            dispatch(postAdd(title,content,userId));
        }
        setTitle("");
        setContent("");
        setUserId(0);
        setId(null);
    }

    return (
        <form onSubmit={handlerSubmit}>
            <label htmlFor="title">Post Title</label> 
            <input 
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handlerTitleChange}
             />
             <br/>
            <label htmlFor="userId">Post Author</label> 
             <select name="userId" id="userId" value={userId} onChange={handlerAuthorChange} >
                <option key="0" value="0">select author</option>
                   {/* <option value=...>data</option> */}
                   {users.map(user=>(
                    <option key={user.id} value={user.id}>{user.fullname}</option>
                   ))}
             </select>
             <br/>
             <label htmlFor="content">Post Content</label>
            <textarea 
                id="content"
                name="content"
                value={content}
                onChange={handlerContentChange}
             />
             <br/>
        
             <button type="submit"> Save Post</button>:
     
        </form>
    )
};

export default AddPostForm;