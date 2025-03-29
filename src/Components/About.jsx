import { Link } from "react-router-dom";
import classes from "./About.module.css";
export default function About() {
  return (
    <section className={classes["about-section"]}>
      <div className={classes["about-container"]}>
        <h1>About HelperConnect</h1>
        <p className={classes.tagline}>
          Bridging the gap between skilled Helpers and those who need them
        </p>

        <div className={classes["about-content"]}>
          <div className={classes["about-card"]}>
            <h2>For Customers</h2>
            <p>
              Need a plumber for an emergency? Looking for a skilled carpenter?
              WorkConnect helps you find verified, skilled laborers in your area
              within minutes. No more unreliable references or endless
              searching.
            </p>
            <ul className={classes["benefits-list"]}>
              <li>✅ Verified professionals with ratings</li>
              <li>✅ Instant booking with transparent pricing</li>
              <li>✅ 24/7 availability for emergencies</li>
            </ul>
          </div>

          <div className={classes["about-card"]}>
            <h2>For Helpers</h2>
            <p>
              Expand your client base and grow your business. WorkConnect helps
              skilled workers like you find more jobs and get paid fairly for
              your expertise.
            </p>
            <ul className={classes["benefits-list"]}>
              <li>💰 Competitive pricing control</li>
              <li>📈 Build your professional profile</li>
              <li>⭐ Earn ratings and reviews</li>
              <li>🛠 Showcase your skills and portfolio</li>
            </ul>
            <Link to="/login" className="cta-button">
              Register as a Helper
            </Link>
          </div>
        </div>

        <div className={classes["stats-section"]}>
          <div className={classes["stat-item"]}>
            <span className={classes["stat-number"]}>5,000+</span>
            <span className={classes["stat-label"]}>Skilled Professionals</span>
          </div>
          <div className={classes["stat-item"]}>
            <span className={classes["stat-number"]}>20+</span>
            <span className={classes["stat-label"]}>Service Categories</span>
          </div>
          <div className={classes["stat-item"]}>
            <span className={classes["stat-number"]}>98%</span>
            <span className={classes["stat-label"]}>Satisfaction Rate</span>
          </div>
        </div>
      </div>
    </section>
  );
}
