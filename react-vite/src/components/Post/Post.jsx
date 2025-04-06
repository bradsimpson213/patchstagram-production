import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { FaHeart, FaRegHeart, FaRegComment, FaEdit, FaTrashAlt } from "react-icons/fa";
import { useThemeContext } from "../../context/ThemeContext";
import { updateLikesThunk } from "../../redux/postsReducer";
import OpenModalButton from "../OpenModalButton"
import ConfirmPostDelete from "../ConfirmPostDelete/ConfirmPostDelete";
import "./Post.css"


const Post = React.memo(function Post ({ data })  {
    const dispatch = useDispatch()
    const { id, caption, user, images, postDate, likes } = data
    const sessionUser = useSelector((state) => state.session.user);
    const { theme } = useThemeContext()

    const handleLike = async () => {
        await dispatch(updateLikesThunk(id))
    }

    return (
        <div className={`post-container ${theme}`}>
            <div className={`post-header ${theme}`}>
                <div className="user-info">
                    <img
                        src={ user.profilePic }
                        alt="user-profile"
                        className={`profile-image ${theme}`}
                    />
                    <h2>{ user.username }</h2>
                </div>
                <h3>{ postDate }</h3>
            </div>
            <div className="post-body">
                <img 
                    src={ images[0].image_URL } 
                    alt="post-content"
                    className="content-image" 
                />
                <div className="tags-container">
                    { images[0].tags.map( (tag, index) => (
                        <span key={ index } className="tag-detail">{`#${tag} `}</span>
                    ))}
                </div>
                <h3>{ caption }</h3>
            </div>
            <div className="post-footer">
                <div className="post-likecomment-container">
                    { likes.length && sessionUser 
                        ? 
                            (likes.includes(sessionUser.id)) 
                                ?   <FaHeart 
                                        style={{color: "red"}} 
                                        onClick={ (e) => handleLike(e) }
                                    />
                                :   <FaRegHeart 
                                        onClick={ (e) => handleLike(e) }
                                    /> 
                        :   <FaRegHeart 
                                onClick={ (e) => handleLike(e) }
                            />
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
})

export default Post;

