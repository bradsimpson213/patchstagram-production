
import { FaHeart, FaRegHeart, FaRegComment  } from "react-icons/fa";
import "./Post.css"


export default function Post ({ data })  {
    const { caption, user, image, postDate, likes } = data
   
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
                <FaRegHeart />
                { likes && <span>{ likes.length }</span> }
                <FaRegComment />
                <span></span>
            </div>
        </div>
    )
}

