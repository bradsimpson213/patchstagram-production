import { NavLink, Link } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="navbar-container">
        <Link to="/">
          <div className="navbar-subcontainer">
            <img
                className='navbar-logo'
                src="https://res.cloudinary.com/app-academy4/image/upload/v1647291502/Patchstagram/patch_hd_riobbp.png"
                alt="cute-kitty-image"
            />
            <span className='navbar-title'>Patchstagram</span>
          </div>
        </Link>
        <NavLink 
          to="/feed"
          className="navbar-navlink"
        >
            Feed
         </NavLink>
        <NavLink 
          to="/new"
          className="navbar-navlink"
        >
          New Post
        </NavLink>
      

      
        <ProfileButton />
      
    </div>
  );
}

export default Navigation;
