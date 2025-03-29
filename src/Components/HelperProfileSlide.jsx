import classes from "./HelperProfileSlide.module.css";
import { useState, useEffect, useRef } from "react";
import { FaTimes, FaStar, FaMapMarkerAlt, FaClock, FaMoneyBillWave, FaPhone, FaEnvelope, FaUserTie } from "react-icons/fa";
import FullProfile from "./FullProfile";

const sampleWorks = [
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500",
  "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=500",
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500",
];

const sampleReviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    date: "2024-02-15",
    comment: "Excellent work! Very professional and completed the job ahead of schedule.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 4,
    date: "2024-02-10",
    comment: "Good service overall. Would recommend for basic repairs.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100"
  },
  {
    id: 3,
    name: "Emma Davis",
    rating: 5,
    date: "2024-02-05",
    comment: "Very knowledgeable and friendly. Great communication throughout the project.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100"
  }
];

const bookingSteps = [
  {
    step: 1,
    title: "Select Service",
    description: "Choose the specific service you need",
  },
  {
    step: 2,
    title: "Schedule Time",
    description: "Pick your preferred date and time",
  },
  {
    step: 3,
    title: "Provide Details",
    description: "Share project details and requirements",
  },
  {
    step: 4,
    title: "Confirm Booking",
    description: "Review and confirm your booking",
  },
];

export default function HelperProfileSlide({ helper, onClose }) {
  const [selectedStep, setSelectedStep] = useState(1);
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [desiredPrice, setDesiredPrice] = useState(helper.hourlyRate);
  const [showFullProfile, setShowFullProfile] = useState(false);
  const slideRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (slideRef.current && !slideRef.current.contains(event.target)) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); // Match this with the animation duration
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Handle booking submission
    console.log({
      helperId: helper.id,
      date: bookingDate,
      time: bookingTime,
      details: projectDetails,
    });
  };

  const handlePriceChange = (e) => {
    setDesiredPrice(parseInt(e.target.value));
  };

  const handleViewFullProfile = () => {
    setShowFullProfile(true);
  };

  const handleCloseFullProfile = () => {
    setShowFullProfile(false);
  };

  if (showFullProfile) {
    return (
      <div className={classes.fullProfileOverlay}>
        <div className={classes.fullProfileContainer}>
          <button className={classes.closeButton} onClick={handleCloseFullProfile}>
            <FaTimes />
          </button>
          <FullProfile helper={helper} onClose={handleCloseFullProfile} />
        </div>
      </div>
    );
  }

  return (
    <div className={`${classes.slideOverlay} ${isClosing ? classes.closing : ''}`}>
      <div ref={slideRef} className={classes.slideContent}>
        <button className={classes.closeButton} onClick={handleClose}>
          <FaTimes />
        </button>
        
        <div className={classes.profileHeader}>
          <img src={helper.image} alt={helper.name} className={classes.profileImage} />
          <div className={classes.profileInfo}>
            <h2>{helper.name}</h2>
            <p className={classes.category}>{helper.category}</p>
            <div className={classes.rating}>
              <FaStar className={classes.starIcon} />
              <span>{helper.rating}</span>
              <span className={classes.reviews}>({helper.reviews} reviews)</span>
            </div>
          </div>
        </div>

        <div className={classes.profileDetails}>
          <div className={classes.detailItem}>
            <FaMapMarkerAlt className={classes.icon} />
            <span>{helper.location}</span>
          </div>
          <div className={classes.detailItem}>
            <FaClock className={classes.icon} />
            <span>{helper.experience} experience</span>
          </div>
          <div className={classes.detailItem}>
            <FaMoneyBillWave className={classes.icon} />
            <span>{helper.hourlyRate}/hr</span>
          </div>
        </div>

        <div className={classes.contactSection}>
          <h3>Contact Information</h3>
          <div className={classes.contactButtons}>
            <button className={classes.contactButton}>
              <FaPhone className={classes.icon} />
              Call
            </button>
            <button className={classes.contactButton}>
              <FaEnvelope className={classes.icon} />
              Message
            </button>
          </div>
        </div>

        <div className={classes.actionButtons}>
          <button className={classes.viewProfileButton} onClick={handleViewFullProfile}>
            <FaUserTie className={classes.icon} />
            View Full Profile
          </button>
        </div>

        <div className={classes.section}>
          <h3>About</h3>
          <p>
            Professional {helper.category.toLowerCase()} with {helper.experience} of experience.
            Based in {helper.location}, specializing in high-quality workmanship and
            customer satisfaction.
          </p>
        </div>

        <div className={classes.section}>
          <h3>Previous Works</h3>
          <div className={classes.worksGrid}>
            {sampleWorks.map((work, index) => (
              <img key={index} src={work} alt={`Work ${index + 1}`} className={classes.workImage} />
            ))}
          </div>
        </div>

        <div className={classes.section}>
          <h3>Customer Reviews</h3>
          <div className={classes.reviewsList}>
            {sampleReviews.map((review) => (
              <div key={review.id} className={classes.reviewItem}>
                <div className={classes.reviewHeader}>
                  <img src={review.image} alt={review.name} className={classes.reviewerImage} />
                  <div className={classes.reviewerInfo}>
                    <h4>{review.name}</h4>
                    <div className={classes.reviewRating}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? classes.starFilled : classes.starEmpty}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className={classes.reviewDate}>{review.date}</span>
                </div>
                <p className={classes.reviewComment}>{review.comment}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={classes.section}>
          <h3>Booking Process</h3>
          <div className={classes.bookingSteps}>
            {bookingSteps.map((step) => (
              <div
                key={step.step}
                className={`${classes.step} ${selectedStep === step.step ? classes.activeStep : ""}`}
                onClick={() => setSelectedStep(step.step)}
              >
                <div className={classes.stepNumber}>{step.step}</div>
                <div className={classes.stepContent}>
                  <h4>{step.title}</h4>
                  <p>{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleBookingSubmit} className={classes.bookingForm}>
            <div className={classes.formGroup}>
              <label>Select Date</label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                required
              />
            </div>
            <div className={classes.formGroup}>
              <label>Select Time</label>
              <select value={bookingTime} onChange={(e) => setBookingTime(e.target.value)} required>
                <option value="">Choose time</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
              </select>
            </div>
            <div className={classes.formGroup}>
              <label>Project Details</label>
              <textarea
                value={projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                placeholder="Describe your project requirements..."
                required
              />
            </div>
            <div className={classes.formGroup}>
              <label>Desired Price Range</label>
              <div className={classes.priceSliderContainer}>
                <input
                  type="range"
                  min={helper.hourlyRate - 20}
                  max={helper.hourlyRate + 20}
                  value={desiredPrice}
                  onChange={handlePriceChange}
                  className={classes.priceSlider}
                />
                <div className={classes.priceDisplay}>
                  <span>${desiredPrice}/hr</span>
                </div>
              </div>
            </div>
            <button type="submit" className={classes.submitButton}>
              Confirm Booking
            </button>
          </form>
        </div>

        <div className={classes.section}>
          <h3>Pricing</h3>
          <div className={classes.pricing}>
            <div className={classes.priceItem}>
              <span>Hourly Rate</span>
              <span>{helper.hourlyRate}/hr</span>
            </div>
            <div className={classes.priceItem}>
              <span>Minimum Hours</span>
              <span>2 hours</span>
            </div>
            <div className={classes.priceItem}>
              <span>Travel Fee</span>
              <span>Free within 10 miles</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 