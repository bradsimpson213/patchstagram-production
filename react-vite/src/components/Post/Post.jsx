import { useSelector, useDispatch } from "react-redux";
import { FaHeart, FaRegHeart, FaRegComment, FaEdit, FaTrashAlt } from "react-icons/fa";
import OpenModalButton from "../OpenModalButton"
import ConfirmPostDelete from "../ConfirmPostDelete/ConfirmPostDelete";
import "./Post.css"


export default function Post ({ data })  {
    const dispatch = useDispatch()
    const { id, caption, user, image, postDate, likes } = data
    const sessionUser = useSelector((state) => state.session.user);
    console.log("LIKES",likes)
    console.log("CUID", sessionUser.id)

    const handleLike = async () => {
        await dispatch()
    }

    return (
        <div className={`post-container`}>
            <div className="post-header">
                <div className="user-info">
                    <img
                        src={ user.profilePic }
                        alt="user-profile"
                        className="profile-image"
                        />
                    <h2>{ user.username }</h2>
                </div>
                <h3>{ postDate }</h3>
            </div>
            <div className="post-body">
                <img 
                    src={ image } 
                    alt="post-content"
                    className="content-image" 
                />
                <h2>{ caption }</h2>
            </div>
            <div className="post-footer">
                <div className="post-likecomment-container">
                    { likes.length && sessionUser 
                        ? 
                            (likes.includes(sessionUser.id)) 
                                ?   <FaHeart style={{color: "red"}} />
                                :   <FaRegHeart /> 
                        : <FaRegHeart />
                    }
                    { likes.length 
                        ? 
                            <span>{ likes.length }</span> 
                        : 
                            <span></span> 
                    }
                    <FaRegComment />
                    <span>1</span>
                </div>
                { sessionUser.id === user.id 
                    ?
                        <div className="post-editdelete-container">
                            <FaEdit />
                            <OpenModalButton 
                                buttonText={<FaTrashAlt />}
                                modalComponent={ <ConfirmPostDelete postId={ id } />}/>
                        </div>
                    : 
                        null 
                }
            </div>
        </div>
    )
}

