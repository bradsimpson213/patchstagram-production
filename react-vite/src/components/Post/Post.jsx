import "./Post.css"


export default function Post ({ data })  {
    const { caption, user, image, postDate } = data
   
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
                <h2>{ caption }</h2>
                <img 
                    src={ image } 
                    alt="main-post-iamge"
                    className="content-image" 
                />
            </div>
        </div>
    )
}

