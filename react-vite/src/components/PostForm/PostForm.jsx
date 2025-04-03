import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { createNewPost } from '../../redux/postsReducer'
import { useThemeContext } from "../../context/ThemeContext";
import "./PostForm.css"


export default function PostForm() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const sessionUser = useSelector((state) => state.session.user);
    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [previewImage, setPreviewImage] = useState("")
    const [validationErrors, setValidationErrors] = useState({})
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [tags, setTags] = useState([])
    const { theme } = useThemeContext()

    // useEffect for error messages
    useEffect(() => {
        const errors = {}
        if (title.length < 5) errors.title = "Caption must be at least 5 characters!"
        if (title.length > 250) errors.title = "Caption can't be over 250 characters!"
        if (!image) errors.image = "Please provide an image file!"
        setValidationErrors(errors)
    }, [title, image])


    // AI Tag Generation API Call
    const getAIGenTags = async (previewImage) => {

        const formData = new FormData();
        formData.append("imageTagging", previewImage)

        const response = await fetch("/api/images/generate_tags", {
            method: 'POST',
            body: formData
        })

        if (response.ok) {
            const imageTags = await response.json()
            console.log("TAGS FROM SERVER", imageTags)
            setTags(imageTags)
            return imageTags
        } else {
            const error = await response.json()
            console.log("AI TAGGING ERROR", error)
            return error
        }
    }

    // useEffect for AI Image tags requests
    useEffect(() => {
        if (previewImage === "") {
            return
        }
        // use image instead of previewImage since image stores a file, previewImage is a URL for that file
        getAIGenTags(image)


    }, [previewImage, image])


    if (!sessionUser) return <Navigate to="/" replace={true} />;


    const handleImage = (e) => {
        setImage(e.target.files[0])
        setPreviewImage(URL.createObjectURL(e.target.files[0]))
    }

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

    const toggleTags = (index) => {
        const newTags = [...tags]
        newTags[index][2] = !(newTags[index][2])
        setTags(newTags)
    }

    return (
        <div className={`postform-container ${theme}`}>
            <h2 className="postform-title">Create a Post</h2>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="postform-form"
            >

                <label className="postform-label">
                    Post Caption:
                    <textarea
                        className='postform-input'
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder='Post Caption'
                    />
                    <span className='caption-counter'>
                        {title.length}/250
                    </span>
                    <div className="form-error" >
                        {hasSubmitted && validationErrors.title}
                    </div >
                </label>
                <label
                    htmlFor="image"
                    className="postform-label">
                    Image File: 
                </label>
                <div className='image-input-container'>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        className="postform-image-input"
                        onChange={(e) => handleImage(e)}
                        placeholder='Image file'
                    />
                    {previewImage
                        ?
                        <div className='postform-preview-container'>
                            <span>Image Preview: </span>
                            <img
                                src={previewImage}
                                className='postform-image-preview'
                            />
                        </div>
                        :
                        null
                    }
                    <div className="form-error" >
                        {hasSubmitted && validationErrors.image}
                    </div>
                </div>
                {tags.length ?
                    <>
                        <p className="postform-label">Image Tags: </p>
                        <div id='tags' className='postform-tags-container'>
                            <table>
                                <thead className='tags-table-header'>
                                    <tr>
                                        <th className='column'></th>
                                        <th className='column'>Tags</th>
                                        <th className='column'>Score</th>
                                    </tr>
                                </thead>
                                {tags.map((tag, index) => (
                                    <tr  key={index}>
                                        <td>
                                            <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={tag[2]}
                                                        onChange={ () => toggleTags(index)}
                                                    />
                                            </label>
                                        </td>
                                        <td>
                                            {`${tag[0]}`}
                                        </td>
                                        <td>
                                            {`${tag[1]}`}
                                        </td>
                                    </tr>
                                ))}

                            </table>
                        </div>
                
                    </>
                    :
                    <div>
                        <h3>Select an Image to Generate AI Tags... </h3>
                    </div>
                }
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