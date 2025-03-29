import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    // Add email validation
    if (!email) {
      setErrors({ email: "Email is required" });
      return;
    }
    // Here you would typically make an API call to send OTP
    setStep(2);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Add OTP validation
    if (!otp) {
      setErrors({ otp: "OTP is required" });
      return;
    }
    // Here you would typically verify OTP
    setStep(3);
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    // Add password validation
    if (!newPassword || !confirmPassword) {
      setErrors({ password: "Both password fields are required" });
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrors({ password: "Passwords do not match" });
      return;
    }
    // Here you would typically make an API call to reset password
    navigate("/login");
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <div className="forgot-password-header">
          <h1>Reset Password</h1>
          <p>Follow the steps to reset your password</p>
        </div>

        {step === 1 && (
          <form className="forgot-password-form" onSubmit={handleEmailSubmit}>
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                required
              />
              {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <button type="submit" className="btn primary-btn">
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="forgot-password-form" onSubmit={handleOtpSubmit}>
            <div className="form-group">
              <label>Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter the OTP sent to your email"
                required
              />
              {errors.otp && <p className="error-message">{errors.otp}</p>}
            </div>
            <button type="submit" className="btn primary-btn">
              Verify OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form className="forgot-password-form" onSubmit={handlePasswordReset}>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                required
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
              />
              {errors.password && <p className="error-message">{errors.password}</p>}
            </div>
            <button type="submit" className="btn primary-btn">
              Reset Password
            </button>
          </form>
        )}

        <div className="forgot-password-links">
          <a href="#" onClick={() => navigate("/login")}>
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
} 