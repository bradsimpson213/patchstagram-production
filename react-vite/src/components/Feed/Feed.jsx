import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "../../redux/postsReducer";
import { useEffect } from "react";
import { useThemeContext } from "../../context/ThemeContext";
import Post from "../Post";
import Footer from "../Footer/Footer";
import "./Feed.css"


export default function Feed () {
    const dispatch = useDispatch()
    const postsObj = useSelector( state => state.posts)
    const posts = Object.values(postsObj)
    const { theme } = useThemeContext()

    useEffect( () => {
        dispatch(getAllPosts())
    }, [dispatch])

    if (!posts) return null

    const compare = (a, b) => {
        if (new Date(a.postDate) < new Date(b.postDate)) return 1;
        if (new Date(a.postDate) > new Date(b.postDate)) return -1;
        if (new Date(a.postDate) === new Date(b.postDate)) return 0;
    };
    const sortedPosts = posts.sort(compare)
   
    return(
        <div className={`feed-container ${theme}`}>
            { sortedPosts.map(post => (
                <Post data={ post } key={ post.id } />
              )) }
            <Footer />
        </div>
    )
}