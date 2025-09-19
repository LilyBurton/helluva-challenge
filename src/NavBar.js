import { useState, useEffect } from 'react'

const NavBar = () => {
    const [navBar, setNavBar] = useState(false);

    const toggleMenu = () => {
        setNavBar(!navBar)
    }
  return (
    <div className = "main-container">
        <div className={navBar ? "nav-menu-active" : "nav-menu"}>
            <a href="/" className="home-link" onClick={toggleMenu}>
                Home
            </a>
            <a href="/about" className="about-link" onClick={toggleMenu}>
                About
            </a>
            <a href="/login" className="login-link" onClick={toggleMenu}>
                Login
            </a> 
            <a href="/contact" className="contact-link" onClick={toggleMenu}>
                <button>Contact</button>
            </a> 
        </div>
      
    </div>
  )
}

export default NavBar

