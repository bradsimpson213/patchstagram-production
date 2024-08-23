import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../redux/postsReducer";
import { useEffect } from "react";
import Post from "../Post";
import "./Feed.css"


export default function Feed () {
    const dispatch = useDispatch()
    const postsObj = useSelector( state => state.posts)
    const posts = Object.values(postsObj)

    useEffect( () => {
        dispatch(getAllPosts())
    }, [dispatch])

    if (!posts) return null

    return(
        <div className="feed-container">
            { posts.map(post => (
                <Post data={ post } key={ post.id } />
              )) }
        </div>
    )
}