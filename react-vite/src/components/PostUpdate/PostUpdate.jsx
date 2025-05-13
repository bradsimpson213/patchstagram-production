import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updatePost } from '../../redux/postsReducer'
import { useModal } from '../../context/Modal';
import "./PostUpdate.css";


export default function PostUpdate({data}) {
    const [id, caption, images] = data
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const [currentCaption, setCurrentCaption] = useState(caption)
    const [currentImageURL, setImageURL] = useState(images[0].image_URL)
    const [newImage, setNewImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    const [currentTags, setCurrentTags] = useState(tagsArray(images[0].tags))
    const [customTag, setCustomTag] = useState("")

    // useEffect for error messages
    useEffect(() => {
        // const errors = {}
        // if (title.length < 5) errors.title = "Caption must be at least 5 characters!"
        // if (title.length > 250) errors.title = "Caption can't be over 250 characters!"
        // if (!image) errors.image = "Please provide an image file!"
        // setValidationErrors(errors)
    }, [])

    const toggleTags = (index) => {
        const newTags = [...currentTags];
        newTags[index][1] = !(newTags[index][1]);
        setCurrentTags(newTags);
    }

    function tagsArray(tags) {
        const inputTags = []
        for (const tag of tags) {
            inputTags.push([tag, true])
        }
        return inputTags
    }

    const handleImage = (e) => {
        setNewImage(e.target.files[0])
        setPreviewImage(URL.createObjectURL(e.target.files[0]))
    }
    
    const handleCustomTag = (e) => {
        e.stopPropagation();
        const newTags = [...currentTags];
        newTags.push([customTag, true]);
        setCurrentTags(newTags);
        setCustomTag("")
    }

    const handleUpdatePost = async (e) => {
        e.preventDefault()

        // prepare tage for server
        const selectedTags = []
        for (const tag of currentTags) {
            if(tag[1]){
                selectedTags.push(tag[0])
            }
        }
        console.log("Selected Tags", selectedTags)
        console.log("ID", id)
        const formData = new FormData()
        formData.append("caption", currentCaption)
        formData.append("image", newImage)
        formData.append("author", sessionUser.id)
        formData.append("tags", currentTags)

        const response = await dispatch(updatePost(formData, id))
        if (response === true) {
            setCurrentCaption("")
            setImageURL("")
            setCurrentTags([])
            // close modal
            closeModal()
        } else {
            console.log('ERROR RESPONSE', response)

        }

    }

    return (
        <div className="post-update-container">
            <h4>Update Post</h4>
            <form
                onSubmit={handleUpdatePost}
                encType="multipart/form-data"
                className="post-update-form"
            >
                <label className="post-update-label">
                    Post Caption:
                </label>
                <textarea
                    className='post-update-input'
                    type="text"
                    value={currentCaption}
                    onChange={(e) => setCurrentCaption(e.target.value)}
                    placeholder='Post Caption'
                />
                <span className='update-caption-counter'>
                    {currentCaption.length}/250
                </span>
                    {/* <div className="form-error" >
                        {hasSubmitted && validationErrors.title}
                    </div > */}
                <div className="postupdate-tagimage-container">
                    <div className="postupdate-image-container" >
                        <label
                            htmlFor="image"
                            className="post-update-label">
                            New Image File: 
                        </label>
                        <div className='updateimage-input-container'>
                            <input
                                id="image"
                                type="file"
                                accept="image/*"
                                className="update-image-input"
                                onChange={(e) => handleImage(e)}
                                placeholder='Image file'
                            />
                            {previewImage
                                ?
                                <div className='update-currentimage-container'>
                                    <span> New Image Preview: </span>
                                    <img
                                        src={previewImage}
                                        className='postupdate-image'
                                    />
                                </div>
                                :
                                <div className='update-previewimage-container'>
                                    <label className="post-update-label">
                                            Current Image:
                                    </label>
                                    <img src={ currentImageURL } className="postupdate-image" />
                                </div>
                            }
                            {/* <div className="form-error" >
                                {hasSubmitted && validationErrors.image}
                            </div> */}
                        </div>
                    </div>
                    {currentTags.length ?
                        <div className="postupdate-tags-container">
                            <label className="post-update-label">
                                Image Tags:
                            </label>
                            <div id='tags' className='post-update-input'>
                                <table>
                                    {currentTags.map((tag, index) => (
                                        <tr  key={ index }>
                                            <td className='row-tag'>
                                                <label>
                                                        <input
                                                            type="checkbox"
                                                            checked={tag[1]}
                                                            onChange={ () => toggleTags(index)}
                                                        />
                                                </label>
                                            </td>
                                            <td className='row-tag'>
                                                {`${tag[0]}`}
                                            </td>
                                        </tr>
                                    ))}
                                </table>
                            </div>
                            <label className="post-update-label" style={{marginTop: "10px"}}>
                                Add Tag:
                            </label>
                            <div className="update-customtag-container">
                                <input
                                    type="text"
                                    value={ customTag }
                                    placeholder="tag name"
                                    onChange={ (e) => setCustomTag(e.target.value) }
                                    className='post-update-customtag-input'
                                />
                                <button 
                                    className="update-tag-button" 
                                    onClick={ (e) => handleCustomTag(e)}
                                    type="button"
                                >
                                    Add Tag
                                </button>
                            </div>
                        </div>
                            :
                        <div>
                            <h3>No Tags!</h3>
                        </div>
                    }
          
                </div>
                <button
                    className="post-update-submit"
                    type="submit"
                >
                    Update Post
                </button>
            </form>          
        </div>
    )
}