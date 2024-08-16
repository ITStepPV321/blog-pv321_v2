import { useSelector } from "react-redux";
const AuthorPost = ({ userId }) => {
    const users = useSelector((store) => store.users);
    const author = users.find(user => user.id === userId);
    return (
        <>
            <span style={{ fontStyle: "italic" }}>Author by {author ? author.fullname : "Uknown Author"} </span>
        </>
    )
};

export default AuthorPost;