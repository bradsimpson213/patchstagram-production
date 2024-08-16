import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const sessionUser = useSelector((state) => state.session.user);


  if (!sessionUser) return <Navigate to="/" replace={true} />;

  return (
    <div className="navbar-container">
        <Link to="/" style={{textDecoration: "none"}}>
          <div className="navbar-subcontainer">
            <img
                className='navbar-logo'
                src="https://res.cloudinary.com/app-academy4/image/upload/v1647291502/Patchstagram/patch_hd_riobbp.png"
                alt="cute-kitty-image"
            />
            <h1 className='navbar-title'>Patchstagram</h1>
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
