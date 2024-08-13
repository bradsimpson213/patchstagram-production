import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import "./LoginForm.css";


function LoginFormPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  // if (sessionUser) return <Navigate to="/feed" replace={true} />;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Log In</h1>
      {errors.length > 0 &&
        errors.map((message) => <p key={message}>{message}</p>)}
      <form 
        onSubmit={ handleSubmit }
        className="login-form"
      >
        <label className="login-form-label">
          Email:
          <input
            type="text"
            value={ email }
            placeholder="email"
            onChange={ (e) => setEmail(e.target.value) }
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label className="login-form-label">
          Password:
          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button 
          className="login-form-button" 
          type="submit"
          >
            Log In
          </button>
      </form>
      <span className="login-singup-wrapper">
        Don&apos;t have an account?  Then head over to the <Link to="/signup">Sign Up</Link> page.
      </span>
    </div>
  );
}

export default LoginFormPage;

