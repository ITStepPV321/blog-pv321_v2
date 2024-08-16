import { UseDispatch, useDispatch } from "react-redux";
import { reactionAdd } from "../../app/appSlices/postsSlice";

// const reactionEmoji = [
//     ['thumbsUp', '👍'],
//     ['heart', '❤️'],
//     ['smiley', '😊'],
//     ['thumbsDown', '👎']
// ];


const reactionEmoji = {
    thumbsUp: '👍',
    heart: '❤️',
    smiley: '😊',
    thumbsDown: '👎'
};

export default function ReactionBtns({ post }) {
    const dispatch=useDispatch();
    // const reactionsButtons = reactionEmoji.map(([nameEmoji, imageEmoji]) => {
    const reactionsButtons = Object.entries(reactionEmoji).map(([nameEmoji, imageEmoji]) => {
        return (
            <button key={nameEmoji} onClick={()=>dispatch(reactionAdd({postId:post.id, reaction:nameEmoji}))}>
                {imageEmoji} {post.reactions[nameEmoji]}
            </button>
        )
    })
    return <div>
        {reactionsButtons}
    </div>
}



// <button>
// 👍 {post.ReactionBtns["thumbsUp"]}
// </button>
// <button>
// ❤️ {post.ReactionBtns["heert"]}
// </button>
//...
//