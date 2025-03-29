import classes from "./TopHelpers.module.css";
import { useState, useEffect, useRef } from "react";
import HelperProfileSlide from "./HelperProfileSlide";

const categories = ["All", "Plumber", "Electrician", "Carpenter", "Painter"];

const topHelpers = [
  // Plumbers
  {
    id: 1,
    name: "John Smith",
    category: "Plumber",
    rating: 4.8,
    reviews: 127,
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    experience: "8 years",
    location: "New York",
    hourlyRate: "$45",
  },
  {
    id: 2,
    name: "David Lee",
    category: "Plumber",
    rating: 4.9,
    reviews: 143,
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    experience: "12 years",
    location: "San Francisco",
    hourlyRate: "$60",
  },
  {
    id: 3,
    name: "Michael Brown",
    category: "Plumber",
    rating: 4.7,
    reviews: 98,
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    experience: "6 years",
    location: "Chicago",
    hourlyRate: "$50",
  },
  {
    id: 4,
    name: "Robert Wilson",
    category: "Plumber",
    rating: 4.9,
    reviews: 156,
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    experience: "15 years",
    location: "Los Angeles",
    hourlyRate: "$65",
  },
  {
    id: 5,
    name: "James Anderson",
    category: "Plumber",
    rating: 4.6,
    reviews: 89,
    image: "https://randomuser.me/api/portraits/men/6.jpg",
    experience: "5 years",
    location: "Houston",
    hourlyRate: "$40",
  },
  // Electricians
  {
    id: 6,
    name: "Sarah Johnson",
    category: "Electrician",
    rating: 4.9,
    reviews: 89,
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    experience: "6 years",
    location: "Los Angeles",
    hourlyRate: "$55",
  },
  {
    id: 7,
    name: "Lisa Chen",
    category: "Electrician",
    rating: 4.8,
    reviews: 112,
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    experience: "7 years",
    location: "Seattle",
    hourlyRate: "$65",
  },
  {
    id: 8,
    name: "Emily Davis",
    category: "Electrician",
    rating: 4.7,
    reviews: 78,
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    experience: "4 years",
    location: "Boston",
    hourlyRate: "$50",
  },
  {
    id: 9,
    name: "Jennifer White",
    category: "Electrician",
    rating: 4.9,
    reviews: 134,
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    experience: "10 years",
    location: "Miami",
    hourlyRate: "$70",
  },
  {
    id: 10,
    name: "Michelle Taylor",
    category: "Electrician",
    rating: 4.8,
    reviews: 95,
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    experience: "8 years",
    location: "Dallas",
    hourlyRate: "$60",
  },
  // Carpenters
  {
    id: 11,
    name: "Mike Wilson",
    category: "Carpenter",
    rating: 4.7,
    reviews: 156,
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    experience: "10 years",
    location: "Chicago",
    hourlyRate: "$50",
  },
  {
    id: 12,
    name: "Thomas Martinez",
    category: "Carpenter",
    rating: 4.8,
    reviews: 123,
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    experience: "12 years",
    location: "Phoenix",
    hourlyRate: "$55",
  },
  {
    id: 13,
    name: "William Clark",
    category: "Carpenter",
    rating: 4.9,
    reviews: 167,
    image: "https://randomuser.me/api/portraits/men/8.jpg",
    experience: "15 years",
    location: "Denver",
    hourlyRate: "$65",
  },
  {
    id: 14,
    name: "Daniel Rodriguez",
    category: "Carpenter",
    rating: 4.6,
    reviews: 92,
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    experience: "6 years",
    location: "San Diego",
    hourlyRate: "$45",
  },
  {
    id: 15,
    name: "Joseph Thompson",
    category: "Carpenter",
    rating: 4.8,
    reviews: 145,
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    experience: "9 years",
    location: "Atlanta",
    hourlyRate: "$60",
  },
  // Painters
  {
    id: 16,
    name: "Emily Brown",
    category: "Painter",
    rating: 4.6,
    reviews: 98,
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    experience: "5 years",
    location: "Houston",
    hourlyRate: "$40",
  },
  {
    id: 17,
    name: "Jessica Lee",
    category: "Painter",
    rating: 4.7,
    reviews: 112,
    image: "https://randomuser.me/api/portraits/women/7.jpg",
    experience: "7 years",
    location: "Portland",
    hourlyRate: "$45",
  },
  {
    id: 18,
    name: "Amanda Wilson",
    category: "Painter",
    rating: 4.8,
    reviews: 134,
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    experience: "9 years",
    location: "Austin",
    hourlyRate: "$50",
  },
  {
    id: 19,
    name: "Rachel Green",
    category: "Painter",
    rating: 4.9,
    reviews: 156,
    image: "https://randomuser.me/api/portraits/women/9.jpg",
    experience: "11 years",
    location: "Nashville",
    hourlyRate: "$55",
  },
  {
    id: 20,
    name: "Samantha Brown",
    category: "Painter",
    rating: 4.7,
    reviews: 89,
    image: "https://randomuser.me/api/portraits/women/10.jpg",
    experience: "6 years",
    location: "Minneapolis",
    hourlyRate: "$45",
  },
];

export default function TopHelpers() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedHelper, setSelectedHelper] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleCategoryChange = (category) => {
    setIsVisible(false);
    setSelectedCategory(category);
    // Reset visibility after a short delay to allow the animation to play again
    setTimeout(() => {
      setIsVisible(true);
    }, 50);
  };

  const filteredHelpers = selectedCategory === "All"
    ? topHelpers
    : topHelpers.filter(helper => helper.category === selectedCategory);

  const handleContactClick = (helper) => {
    setSelectedHelper(helper);
  };

  const handleCloseSlide = () => {
    setSelectedHelper(null);
  };

  return (
    <section className={classes.topHelpersSection} ref={sectionRef}>
      <div className={classes.container}>
        <h2 className={classes.sectionTitle}>Top Rated Helpers</h2>
        <p className={classes.sectionSubtitle}>
          Discover our most trusted and highly rated professionals
        </p>
        
        <div className={classes.categoryTabs}>
          {categories.map((category) => (
            <button
              key={category}
              className={`${classes.categoryTab} ${
                selectedCategory === category ? classes.activeTab : ""
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div 
          ref={containerRef}
          className={`${classes.helpersScrollContainer} ${isVisible ? classes.visible : ''}`}
        >
          <div className={classes.helpersGrid}>
            {filteredHelpers.map((helper) => (
              <div key={helper.id} className={classes.helperCard}>
                <div className={classes.cardHeader}>
                  <img
                    src={helper.image}
                    alt={helper.name}
                    className={classes.helperImage}
                  />
                  <div className={classes.ratingContainer}>
                    <span className={classes.rating}>★ {helper.rating}</span>
                    <span className={classes.reviews}>({helper.reviews} reviews)</span>
                  </div>
                </div>
                <div className={classes.cardBody}>
                  <h3 className={classes.helperName}>{helper.name}</h3>
                  <p className={classes.helperCategory}>{helper.category}</p>
                  <div className={classes.helperDetails}>
                    <span className={classes.experience}>
                      {helper.experience} experience
                    </span>
                    <span className={classes.location}>{helper.location}</span>
                  </div>
                  <div className={classes.cardFooter}>
                    <span className={classes.hourlyRate}>{helper.hourlyRate}/hr</span>
                    <button 
                      className={classes.contactButton}
                      onClick={() => handleContactClick(helper)}
                    >
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedHelper && (
        <HelperProfileSlide
          helper={selectedHelper}
          onClose={handleCloseSlide}
        />
      )}
    </section>
  );
} 