import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./DemoUser.css"


export default function DemoUser () {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault();

        const demoUser = {
            email: "demo@gmail.com",
            password: "password"
        }

        const serverResponse = await dispatch(
            thunkLogin(demoUser)
          );
      
        if (serverResponse) {
            console.log("BUMMER")
        } else {
        navigate("/feed");
        }
    };

    return (
        <div className="demouser-container">
            <button
                onClick={ handleClick }
                className="demouser-button"
            >
                Demo User Login
            </button>
        </div>
    )
}