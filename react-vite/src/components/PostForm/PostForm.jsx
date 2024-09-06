import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { createNewPost } from '../../redux/postsReducer'// import { createNewPost } from "../store/postsReducer"
import "./PostForm.css"

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
        if (title.length > 250) errors.title = "Caption can't be over 250 characters!"
        if (!image) errors.image = "Please provide an image url!"
        setValidationErrors(errors)
    }, [title, image])
    
    if (!sessionUser) return <Navigate to="/" replace={true} />;
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(image.filename, title)
        setHasSubmitted(true)

        // need to implement a return here and maybe custom modal 
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
        <div className="postform-container">
            <h2 className="postform-title">Create a Post</h2>
            <form 
                onSubmit={ handleSubmit }
                encType="multipart/form-data"
                className="postform-form"
            >
              
                <label className="postform-label">
                    Post Caption:
                    <textarea 
                        className='postform-input'
                        type="text"
                        value={ title }
                        onChange={ function (e) {setTitle(e.target.value)}}
                        placeholder='Post Caption'
                    />
                    <span className='caption-counter'>{title.length}/250</span>
                </label>
                <div style={{ color: "red"}}>
                    { hasSubmitted && validationErrors.title }
                </div >
                <label 
                    htmlFor="image" 
                    className="postform-label">
                    Image File:
                </label>
                <input 
                    id="image"
                    type="file"
                    accept="image/*"
                    className="postform-image-input"
                    onChange={ (e) => setImage(e.target.files[0])}
                    placeholder='Image URL'
                />
                <div style={{ color: "red"}}>
                    { hasSubmitted && validationErrors.image }
                </div>
                <button 
                className="postform-button"
                type="submit"
                >
                    Create Post
                </button>
            </form>
           
        </div>
    )
}