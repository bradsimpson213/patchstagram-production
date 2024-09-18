import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import DemoUser from "../DemoUser/DemoUser";
import "./SignupForm.css"


function SignupFormPage() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  // const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [profileImage, setProfileImage] = useState("")
  const [previewImage, setPreviewImage] = useState("")
  const [bio, setBio] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState({})

  // if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleImage = (e) => {
    setProfileImage(e.target.files[0])
    setPreviewImage(URL.createObjectURL(e.target.files[0]))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const newUser = new FormData()
    newUser.append("email", email)
    newUser.append("username", username)
    newUser.append("password", password )
    newUser.append("image", profileImage )
    newUser.append("bio", bio )

    const serverResponse = await dispatch(thunkSignup(newUser))

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form 
        onSubmit={ handleSubmit }
        className="signup-form"
      >
      
        <label className="signup-form-label">
          Email:
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email@domain.ext"
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label className="signup-form-label">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="user1234"
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label 
          htmlFor="image" 
          className="signup-form-label"
          style={{ margin: "0px"}}>
          Image File:
        </label>
        <div className='signup-image-input-container'>
          <input 
              id="image"
              type="file"
              accept="image/*"
              className="signup-image-input"
              onChange={ (e) => handleImage(e) }
              placeholder='Image URL'
          />
          { previewImage 
              ? 
                  <div className='postform-preview-container'>
                      <span>Image Preview: </span>
                      <img 
                          src={ previewImage }
                          className='postform-image-preview' 
                      />
                  </div>
              :
                  <div></div>                        
          }
          {errors.profileImage && <p>{errors.profileImage}</p>}
        </div>
        <label className="signup-form-label">
          Biography:
          <textarea
            type="text"
            value={ bio }
            onChange={(e) => setBio(e.target.value)}
          />
        </label>
        {errors.bio && <p>{errors.bio}</p>}
        <label className="signup-form-label">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label className="signup-form-label">
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button 
          type="submit"
          className="signup-form-button"
        >
          Sign Up
        </button>
        <DemoUser />
      </form>
      <span className="signup-login-wrapper">
        Already have an account?  Then head over to the <Link to="/login">Log In</Link> page.
      </span>
    </div>
  );
}

export default SignupFormPage;
