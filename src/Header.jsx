import { useState } from "react"
import { Link } from "react-router-dom"
import "./App.css"
const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [registrationNumber, setRegistrationNumber] = useState("")

    return (
        <>
        <div className="header">
            <div className="header-content">
                <div className="logo">
                    <Link to="/" > <img src="/logo.png" alt="Axis Bank" /></Link>
                    {/* <span>AXIS BANK</span> */}
                </div>
                {!menuOpen ? (
                    <button className="menu-btn" onClick={() => setMenuOpen(true)}>☰</button>
                ) : (
                    <button className="menu-btn" onClick={() => setMenuOpen(false)}>X</button>
                )}
            </div>
        </div>
        
        {/* Login Modal */}
            {showLoginModal && (
                <div className="modal-overlay" onClick={() => setShowLoginModal(false)}>
                    <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>Login</h3>
                            <button className="close-btn" onClick={() => setShowLoginModal(false)}>×</button>
                        </div>
                        <div className="modal-body">
                            <div className="form-step">
                                <h4>Enter Registered Number</h4>
                                <input
                                    type="text"
                                    placeholder="Registered Number"
                                    value={registrationNumber}
                                    onChange={(e) => setRegistrationNumber(e.target.value)}
                                    className="form-input"
                                />
                                <button
                                    className="form-btn"
                                    onClick={() => {
                                        setShowLoginModal(false)
                                        window.location.href = "/" // redirect home
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}


            {/* Hamburger Menu */}
            {menuOpen && (
                <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
                    <div className="menu" onClick={(e) => e.stopPropagation()}>
                        <div className="menu-header">
                           <Link to="/" > <img src="/logo.png" alt="Axis Bank" /></Link>
                            <button className="close-btn" onClick={() => setMenuOpen(false)}>×</button>
                        </div>
                        <ul className="menu-list">
                            {["Explore Products", "Grab Deals", "Bank Smart", "Credit Card", "Benefits", "Personal", "Business", "About Us", "Support"].map((item, i) => (
                                <li key={i} onClick={() => setMenuOpen(false)}>{item}</li>
                            ))}
                        </ul>
                        <div className="menu-footer">
                            <span className="lang-switch">Switch to हिन्दी</span>
                            <button className="login-btn" onClick={() => { setShowLoginModal(true); setMenuOpen(false) }}>LOGIN</button>
                        </div>
                    </div>
                </div>
            )}
        </>

        
    )
}

export default Header