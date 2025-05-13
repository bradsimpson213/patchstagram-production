
const GET_POSTS = "postsState/get_posts"
const CREATE_POST = "postsState/create_post"
const UPDATE_POST = "postsState/update_post"
const DELETE_POST = "postState/delete_post"
const UPDATE_LIKES = "postState/update_post"

// ACTION CREATORS
export const getPosts = (posts) => ({
    type: GET_POSTS,
    posts
})

export const createPost = (post) => ({
    type: CREATE_POST,
    post
})

export const udatePost = (post) => ({
    type: UPDATE_POST,
    post
})

export const deletePost = (postId) => ({
    type: DELETE_POST,
    postId
})

export const updateLikes = (post) => ({
    type: UPDATE_LIKES,
    post
})

// THUNKS
export const getAllPosts = () => async (dispatch) => {
    const response = await fetch("/api/posts/all")

    if (response.ok) {
        const { posts } = await response.json()
        dispatch(getPosts(posts))
    } else {
        const errors = await response.json()
        return errors
    }
}

export const createNewPost = (post) => async (dispatch) => {
    const response = await fetch("/api/posts/new",{
        method: 'POST',
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

export const updatePost = (post, id) => async (dispatch) => {
    const response = await fetch(`/api/posts/update/${id}`,{
        method: 'PATCH',
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

export const deletePostThunk = (id) => async (dispatch) => {
    const response = await fetch(`/api/posts/delete/${id}`)

    if (response.ok) {
        dispatch(deletePost(id))
    } else {
        const error = await response.json()
        console.log("DElPost ERROR", error)
    }
}

export const updateLikesThunk = (postId) => async (dispatch) => {
    const response = await fetch(`/api/posts/likes/${postId}`)

    if (response.ok) {
        const { resPost } = await response.json()
        console.log("WE GOT A LIKE RESPONSE")
        dispatch(updateLikes(resPost))
    } else {
        const error = await response.json()
        console.log("LIKES ERROR", error)
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

        case DELETE_POST:
            newState = {...state}
            delete newState[action.postId]
            console.log(`DELETEPOST-${action.postId}`, newState )
            return newState

        case UPDATE_LIKES:
            newState = {...state}
            // not the best way to do it but will wor
            newState[action.post.id] = action.post
            return newState
           
        default:
            return state
    }
}

export default postsReducer