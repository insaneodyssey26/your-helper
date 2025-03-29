import { useState, useEffect } from "react";

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userType, setUserType] = useState(null);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    age: "",
    gender: "",
    paymentMethod: "",
    location: "",
    skill: "",
    experience: "",
    password: "",
    certifications: [],
    cv: null
  });
  const [errors, setErrors] = useState({});
  const [isStepValid, setIsStepValid] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // Validate form data
  const validateForm = (step) => {
    const newErrors = {};
    
    switch(step) {
      case 1:
        if (!userType) {
          newErrors.userType = "Please select an account type";
        }
        break;
      case 2:
        if (!formData.fullname.trim()) {
          newErrors.fullname = "Full name is required";
        }
        if (!formData.email.trim()) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Please enter a valid email";
        }
        if (!formData.age || formData.age < 18) {
          newErrors.age = "You must be at least 18 years old";
        }
        if (!formData.gender) {
          newErrors.gender = "Please select your gender";
        }
        if (userType === 'customer') {
          if (!formData.paymentMethod) {
            newErrors.paymentMethod = "Please select a payment method";
          }
          if (!formData.location.trim()) {
            newErrors.location = "Location is required";
          }
        } else if (userType === 'Helper') {
          if (!formData.skill.trim()) {
            newErrors.skill = "Primary skill is required";
          }
          if (!formData.experience || formData.experience < 0) {
            newErrors.experience = "Please enter valid experience";
          }
          if (!formData.certifications) {
            newErrors.certifications = "Please upload your certifications";
          }
        }
        break;
      case 3:
        if (!formData.password) {
          newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
          newErrors.password = "Password must be at least 6 characters";
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle user type selection
  const handleUserTypeSelect = (type) => {
    setUserType(type);
    const cards = document.querySelectorAll('.user-card');
    cards.forEach(card => {
      card.classList.remove('selected');
      if (card.dataset.type === type) {
        card.classList.add('selected');
      }
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const { name } = e.target;
    const files = Array.from(e.target.files);

    if (name === 'certifications') {
      const validFiles = files.filter(file => file.type === 'application/pdf');
      if (validFiles.length !== files.length) {
        setErrors(prev => ({
          ...prev,
          certifications: "Please upload only PDF files"
        }));
        return;
      }
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, ...validFiles]
      }));
    } else if (name === 'cv') {
      const file = files[0];
      if (file && file.type === 'application/pdf') {
        setFormData(prev => ({
          ...prev,
          cv: file
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          cv: "Please upload a PDF file"
        }));
      }
    }
  };

  // Handle certificate removal
  const handleRemoveCertificate = (index) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  // Handle step navigation
  const handleNext = () => {
    setShowErrors(true);
    if (validateForm(currentStep)) {
      setCurrentStep(prev => prev + 1);
      setShowErrors(false);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
    setShowErrors(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowErrors(true);
    if (validateForm(currentStep)) {
      try {
        // Here you would typically send the data to your backend
        console.log('Form submitted:', { userType, ...formData });
        // Redirect to login or dashboard
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
  };

  return (
    <>
      <div className="signup-flow">
        <div className="signup-container">
          <div className="progress-bar">
            {[1, 2, 3].map(step => (
              <div 
                key={step}
                className={`progress-step ${currentStep >= step ? 'active' : ''}`}
                data-step={step}
              >
                {step}
              </div>
            ))}
          </div>

          <div className={`step ${currentStep === 1 ? 'active' : ''}`} data-step="1">
            <h1>Create Your Account</h1>
            <div className="user-type-grid">
              <div 
                className="user-card" 
                data-type="customer"
                onClick={() => handleUserTypeSelect('customer')}
              >
                <i className="fas fa-user-tie"></i>
                <h3>Customer</h3>
                <p>I want to hire skilled workers</p>
              </div>
              <div 
                className="user-card" 
                data-type="Helper"
                onClick={() => handleUserTypeSelect('Helper')}
              >
                <i className="fas fa-tools"></i>
                <h3>Helper</h3>
                <p>I want to offer my services</p>
              </div>
            </div>
            {showErrors && errors.userType && <p className="error-message">{errors.userType}</p>}
            <div className="form-actions">
              <button 
                className="btn primary-btn next-step" 
                onClick={handleNext}
                disabled={!userType}
              >
                Next
              </button>
            </div>
          </div>

          <div className={`step ${currentStep === 2 ? 'active' : ''}`} data-step="2">
            <h1>Personal Details</h1>
            <form className="signup-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="fullname"
                    value={formData.fullname}
                    onChange={handleInputChange}
                    required
                  />
                  {showErrors && errors.fullname && <p className="error-message">{errors.fullname}</p>}
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required 
                  />
                  {showErrors && errors.email && <p className="error-message">{errors.email}</p>}
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    min="18"
                    required
                  />
                  {showErrors && errors.age && <p className="error-message">{errors.age}</p>}
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    name="gender" 
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {showErrors && errors.gender && <p className="error-message">{errors.gender}</p>}
                </div>
              </div>

              {/* Customer-specific fields */}
              {userType === 'customer' && (
                <div className="form-grid">
                  <div className="form-group">
                    <label>Preferred Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="Enter your preferred location"
                      required
                    />
                    {showErrors && errors.location && <p className="error-message">{errors.location}</p>}
                  </div>
                  <div className="form-group">
                    <label>Preferred Payment Method</label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select payment method</option>
                      <option value="credit">Credit Card</option>
                      <option value="debit">Debit Card</option>
                      <option value="upi">UPI</option>
                      <option value="netbanking">Net Banking</option>
                    </select>
                    {showErrors && errors.paymentMethod && <p className="error-message">{errors.paymentMethod}</p>}
                  </div>
                </div>
              )}

              {/* Helper-specific fields */}
              {userType === 'Helper' && (
                <div className="form-grid">
                  <div className="form-group">
                    <label>Primary Skill</label>
                    <select
                      name="skill"
                      value={formData.skill}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select your primary skill</option>
                      <option value="plumbing">Plumbing</option>
                      <option value="electrical">Electrical</option>
                      <option value="carpentry">Carpentry</option>
                      <option value="painting">Painting</option>
                      <option value="cleaning">Cleaning</option>
                      <option value="appliance">Appliance Repair</option>
                    </select>
                    {showErrors && errors.skill && <p className="error-message">{errors.skill}</p>}
                  </div>
                  <div className="form-group">
                    <label>Years of Experience</label>
                    <input
                      type="number"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      placeholder="Enter years of experience"
                      min="0"
                      required
                    />
                    {showErrors && errors.experience && <p className="error-message">{errors.experience}</p>}
                  </div>
                  <div className="form-group">
                    <label>Certifications (Optional)</label>
                    <div className="file-input-wrapper">
                      <input
                        type="file"
                        name="certifications"
                        onChange={handleFileChange}
                        accept=".pdf"
                        multiple
                      />
                      <label className="file-label">
                        <i className="fas fa-upload"></i>
                        <span>Upload Certifications (PDF only)</span>
                      </label>
                    </div>
                    {showErrors && errors.certifications && <p className="error-message">{errors.certifications}</p>}
                    {formData.certifications.length > 0 && (
                      <div className="uploaded-files">
                        {formData.certifications.map((file, index) => (
                          <div key={index} className="file-item">
                            <i className="fas fa-file-pdf"></i>
                            <span>{file.name}</span>
                            <button 
                              type="button" 
                              className="remove-file"
                              onClick={() => handleRemoveCertificate(index)}
                            >
                              <i className="fas fa-times"></i>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <label>CV/Resume (Optional)</label>
                    <div className="file-input-wrapper">
                      <input
                        type="file"
                        name="cv"
                        onChange={handleFileChange}
                        accept=".pdf"
                      />
                      <label className="file-label">
                        <i className="fas fa-file-alt"></i>
                        <span>Upload CV/Resume (PDF only)</span>
                      </label>
                    </div>
                    {showErrors && errors.cv && <p className="error-message">{errors.cv}</p>}
                    {formData.cv && (
                      <div className="uploaded-files">
                        <div className="file-item">
                          <i className="fas fa-file-pdf"></i>
                          <span>{formData.cv.name}</span>
                          <button 
                            type="button" 
                            className="remove-file"
                            onClick={() => setFormData(prev => ({ ...prev, cv: null }))}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="form-actions">
                <button type="button" className="btn back-btn" onClick={handleBack}>
                  Back
                </button>
                <button 
                  type="button" 
                  className="btn primary-btn next-step" 
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </form>
          </div>

          <div className={`step ${currentStep === 3 ? 'active' : ''}`} data-step="3">
            <h1>Complete Your Profile</h1>
            <form className="signup-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <h2 className="password">Password:</h2>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                {showErrors && errors.password && <p className="error-message">{errors.password}</p>}
              </div>

              <div className="form-actions">
                <button type="button" className="btn back-btn" onClick={handleBack}>
                  Back
                </button>
                <button type="submit" className="btn primary-btn">
                  Complete Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
