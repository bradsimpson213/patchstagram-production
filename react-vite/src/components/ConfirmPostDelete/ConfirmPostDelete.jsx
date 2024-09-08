import { useDispatch } from "react-redux";
import { deletePostThunk } from "../../redux/postsReducer";
import { useModal } from "../../context/Modal";
import { useThemeContext } from "../../context/ThemeContext";
import "./ConfirmPostDelete.css";


export default function ConfirmPostDelete ({ postId }) {
    const dispatch = useDispatch()
    const { closeModal } = useModal()
    const { theme } = useThemeContext()


    const handleDelete = async (e) => {
        e.preventDefault()
        await dispatch(deletePostThunk(postId))
        closeModal()
    }

    return (
        <div className={`confirm-delete-container ${theme}`} >
            <p>Are you sure you want to delete this post?</p>
            <div className={`modal-button-container`}>
                <button
                    onClick={ (e) => handleDelete(e) }
                    className={`modal-button ${theme}`}
                >
                    Yes
                </button>
                <button
                    onClick={ closeModal }
                    className={`modal-button ${theme}`}
                >
                    No
                </button>
            </div>
        </div>
    )
}