import { MdDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";
import { useThemeContext } from "../../context/ThemeContext";
import './Switch.css';


export default function Switch() {
    const { theme, setTheme } = useThemeContext()
    // const { theme, setTheme } = useThemeContext()
    return (
        <div className="theme-switch-container">
            { theme == "dark" ?
                <span>Dark Theme</span>
                :
                <span>Light Theme</span>
            }
            <input
                className="react-switch-checkbox"
                id="theme-switch"
                type="checkbox" 
                onChange={ () => setTheme(prevState => prevState === "dark" ? "light" : "dark")}
            />
            <label
                className="react-switch-label"
                htmlFor="theme-switch"
            >
                <span className={`react-switch-button`} >
                    { theme === 'dark' ? 
                        <MdDarkMode style={{ color: "black"}}/> 
                        : 
                        <MdLightMode style={{ color: "black"}} /> 
                    }
                </span>
            </label>
    
        </div>
    )
}


// This component was build using Switch reading external resource
// https://upmostly.com/tutorials/build-a-react-switch-toggle-component
