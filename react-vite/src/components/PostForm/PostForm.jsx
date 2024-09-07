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
        if (title.length < 5) errors.title = "Caption must be at least 5 characters!"
        if (title.length > 250) errors.title = "Caption can't be over 250 characters!"
        if (!image) errors.image = "Please provide an image file!"
        setValidationErrors(errors)
    }, [title, image])
    
    if (!sessionUser) return <Navigate to="/" replace={true} />;
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        // console.log(image.filename, title)mostly re
        setHasSubmitted(true)

        // need to implement a return here and maybe custom modal 
        if (Object.values(validationErrors).length) return
    
        // return alert(`The following errors were found:
        // ${validationErrors.title ? "* " + validationErrors.title : ""}
        // ${validationErrors.image ? "* " + validationErrors.image : ""}
        // `)

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
                    <span className='caption-counter'>
                        {title.length}/250
                    </span>
                <div className="form-error" >
                    { hasSubmitted && validationErrors.title }
                </div >
                </label>
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
                <div className="form-error" >
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