import { Link } from "react-router-dom";
import classes from "./HeroSection.module.css";
import { useState } from "react";
import TopHelpers from "./TopHelpers";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search functionality here
    console.log("Searching for:", searchQuery);
  };

  return (
    <>
      <section className={classes.hero}>
        <div className={classes.heroContent}>
          <h1 className={classes.heroTitle}>Find Skilled Helpers in Minutes</h1>
          <p className={classes.heroSubtitle}>
            Connect with verified carpenters, electricians, plumbers and more for
            your home or business projects
          </p>
          <div className={classes.searchBarContainer}>
            <form onSubmit={handleSearch} className={classes.searchForm}>
              <input
                type="text"
                placeholder="Search for services (e.g., plumber, electrician)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={classes.searchInput}
              />
              <button type="submit" className={classes.searchButton}>
                Search
              </button>
            </form>
          </div>
          <div className={classes.ctaContainer}>
            <Link to="/categories" className={classes.primaryButton}>
              Browse Professionals
            </Link>
            <Link to="/signup" className={classes.secondaryButton}>
              Register as Helper
            </Link>
          </div>
        </div>
      </section>
      <TopHelpers />
    </>
  );
}
