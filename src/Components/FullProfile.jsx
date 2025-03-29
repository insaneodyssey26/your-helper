import React, { useEffect, useRef } from 'react';
import classes from './FullProfile.module.css';
import { FaUserTie, FaMapMarkerAlt, FaPhone, FaEnvelope, FaStar, FaBriefcase, FaGraduationCap, FaCertificate } from 'react-icons/fa';

const FullProfile = ({ helper, onClose }) => {
  const profileRef = useRef(null);
  const [isClosing, setIsClosing] = React.useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
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

  return (
    <div className={`${classes.profileOverlay} ${isClosing ? classes.closing : ''}`}>
      <div ref={profileRef} className={`${classes.profileContainer} ${isClosing ? classes.closing : ''}`}>
        <div className={classes.header}>
          <div className={classes.coverPhoto}>
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600" alt="Cover" />
          </div>
          <div className={classes.profileHeader}>
            <div className={classes.profileImage}>
              <img src={helper.image} alt={helper.name} />
            </div>
            <div className={classes.profileInfo}>
              <h1>{helper.name}</h1>
              <h2>{helper.profession}</h2>
              <div className={classes.location}>
                <FaMapMarkerAlt /> {helper.location}
              </div>
              <div className={classes.rating}>
                <FaStar /> {helper.rating} ({helper.reviewCount} reviews)
              </div>
            </div>
          </div>
        </div>

        <div className={classes.content}>
          <div className={classes.mainContent}>
            <section className={classes.about}>
              <h3>About</h3>
              <p>{helper.description}</p>
            </section>

            <section className={classes.experience}>
              <h3><FaBriefcase /> Experience</h3>
              <div className={classes.experienceItem}>
                <h4>Senior Professional</h4>
                <p className={classes.company}>Self-employed</p>
                <p className={classes.date}>2020 - Present</p>
                <ul>
                  <li>Completed over 500 successful projects</li>
                  <li>Maintained 4.8/5 customer satisfaction rating</li>
                  <li>Specialized in complex technical solutions</li>
                </ul>
              </div>
            </section>

            <section className={classes.education}>
              <h3><FaGraduationCap /> Education</h3>
              <div className={classes.educationItem}>
                <h4>Professional Certification</h4>
                <p className={classes.school}>Technical Institute</p>
                <p className={classes.date}>2018 - 2020</p>
              </div>
            </section>

            <section className={classes.skills}>
              <h3><FaCertificate /> Skills</h3>
              <div className={classes.skillsList}>
                {helper.skills?.map((skill, index) => (
                  <span key={index} className={classes.skillTag}>{skill}</span>
                ))}
              </div>
            </section>
          </div>

          <div className={classes.sidebar}>
            <div className={classes.contactCard}>
              <h3>Contact Information</h3>
              <div className={classes.contactItem}>
                <FaPhone /> {helper.phone}
              </div>
              <div className={classes.contactItem}>
                <FaEnvelope /> {helper.email}
              </div>
            </div>

            <div className={classes.availabilityCard}>
              <h3>Availability</h3>
              <p>Available for new projects</p>
              <p>Response time: Within 24 hours</p>
            </div>

            <div className={classes.pricingCard}>
              <h3>Pricing</h3>
              <p>Starting from ${helper.price}/hour</p>
              <p>Custom quotes available for larger projects</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullProfile; 