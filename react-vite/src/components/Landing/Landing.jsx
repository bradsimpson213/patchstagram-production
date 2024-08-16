import { Link } from "react-router-dom"
import "./Landing.css"
import Footer from "../Footer"


export default function Landing () {
    return(
        <div className="landing-container">
            <h1 className="landing-title">Welcome to Patchstagram!</h1>
            <img
                className="landing-image" 
                src="https://res.cloudinary.com/app-academy4/image/upload/v1647291502/Patchstagram/patch_hd_riobbp.png" 
                alt="cute-kitty-image"
            />
            <p className="landing-subtitle">The cat with so much to talk about, he needs his own social media site!</p>
            <div className="landing-links-container">
                <Link 
                to="/login" 
                className="landing-link"
                >
                    Login
                </Link>
                <Link 
                to="/signup" 
                className="landing-link"
                >
                    Sign Up
                </Link>
            </div>
            <Footer />
        </div>
    )
}