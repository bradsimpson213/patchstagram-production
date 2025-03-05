import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./Footer.css"

export default function Footer () {

    return (
        <>
            <span className="footer">
                ©Brad Simpson 2024
                <Link to="https://github.com/bradsimpson213">
                    <FaGithub />
                </Link>
                <Link to="'https://www.linkedin.com/in/charles-simpson-a6b1b7b2/">
                    <FaLinkedin />
                </Link>
                <Link to="mailto:bradsimpson@icloud.com">
                    <FiMail />
                </Link>
            </span>
        </>
    )
}