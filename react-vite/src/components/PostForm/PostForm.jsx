import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { createNewPost } from '../../redux/postsReducer'// import { createNewPost } from "../store/postsReducer"


export default function PostForm () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [validationErrors, setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)


    
    useEffect( () => {
        const errors = {}
        if (!title.length) errors.title = "Please enter a post title!"
        if (!image) errors.image = "Please provide an image url!"
        setValidationErrors(errors)
    }, [title, image])
    
    if (!sessionUser) return <Navigate to="/" replace={true} />;
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(image.filename, title)
        setHasSubmitted(true)

        if (Object.values(validationErrors).length) 
        return alert(`The following errors were found:
        ${validationErrors.title ? "* " + validationErrors.title : ""}
        ${validationErrors.image ? "* " + validationErrors.image : ""}
        `)


        const formData = new FormData()
        formData.append("caption", title)
        formData.append("image", image)
        formData.append("author", sessionUser.id)

        const response = await dispatch(createNewPost(formData))
        if (response === true) {
            setTitle("")
            setImage("")
            navigate("/feed")
        } else {
            console.log('ERROR RESPONSE', response)
            setValidationErrors(response)
        }
    }


    return (
        <div className="feed-container">
            <h2>Create Post </h2>
            <form 
                onSubmit={ handleSubmit }
                encType="multipart/form-data"
            >
                <div>
                    <label htmlFor="title">Title:</label>
                    <input 
                        id="title"
                        type="text"
                        value={ title }
                        onChange={ function (e) {setTitle(e.target.value)}}
                        placeholder='Title'
                    />
                </div>
                <div style={{ color: "red"}}>
                    { hasSubmitted && validationErrors.title }
                </div>
                <div>
                    <label htmlFor="image">Image File:</label>
                    <input 
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={ (e) => setImage(e.target.files[0])}
                        placeholder='Image URL'
                    />
                </div>
                <div style={{ color: "red"}}>
                    { hasSubmitted && validationErrors.image }
                </div>
                <button>Submit</button>
            </form>
           
        </div>
    )
}