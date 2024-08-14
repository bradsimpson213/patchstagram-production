
const GET_POSTS = "postsState/get_posts"
const CREATE_POST = 'postsState/create_post'

// ACTION CREATORS
export const getPosts = (posts) => ({
    type: GET_POSTS,
    posts
})

export const createPost = (post) => ({
    type: CREATE_POST,
    post
})


// THUNKS
export const getAllPosts = () => async (dispatch) => {
    const response = await fetch("/api/posts/all")

    if (response.ok) {
        const { posts } = await response.json()
        console.log("G-A_P Response", posts)
        dispatch(getPosts(posts))
    } else {
        const error = await response.json()
        console.log("G-A-P ERROR", error)
    }
}

export const createNewPost = (post) => async (dispatch) => {
    const response = await fetch("/api/posts/new",{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json'
        },
        body: post
    })

    if (response.ok) {
        const { resPost } = await response.json()
        console.log("CP Response", resPost)
        dispatch(createPost(resPost))
        return true
    } else {
        const error = await response.json()
        console.log("CP ERROR", error)
        return error
    }
}

// REDUCER
const initialState = { }

const postsReducer = (state=initialState, action) => {
    let newState = {}
    switch(action.type){
        case GET_POSTS:
            newState = { ...state }
            action.posts.forEach( post => (newState[post.id] = post ))
            // console.log("NEWSTATE", newState)
            return newState
          
        case CREATE_POST:
            newState = { ...state }
            newState[action.post.id] = action.post
            console.log("CREATEPOST", newState )
            return newState
           
        default:
            return state
    }
}

export default postsReducer