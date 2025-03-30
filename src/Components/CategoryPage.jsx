import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './CategoryPage.module.css';
import { FaSearch, FaSort, FaUser, FaHandshake } from "react-icons/fa";
import FullProfile from './FullProfile';

const professionalsData = {
  carpenter: [
    { 
      id: 1, 
      name: "Rajesh Kumar", 
      experience: "8 years", 
      rating: 4.8, 
      cost: 500, 
      skills: ["Furniture", "Cabinet Making", "Wood Carving"],
      image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=500"
    },
    { 
      id: 2, 
      name: "Vikram Singh", 
      experience: "5 years", 
      rating: 4.5, 
      cost: 400, 
      skills: ["Doors", "Windows", "Wood Polishing"],
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500"
    },
    { 
      id: 3, 
      name: "Deepak Sharma", 
      experience: "12 years", 
      rating: 4.9, 
      cost: 650, 
      skills: ["Custom Furniture", "Restoration", "Carpentry"],
      image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=500"
    }
  ],
  electrician: [
    { 
      id: 4, 
      name: "Anil Sharma", 
      experience: "10 years", 
      rating: 4.9, 
      cost: 600, 
      skills: ["Wiring", "Panel Repair", "Safety Checks"],
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500"
    },
    { 
      id: 5, 
      name: "Sunil Patel", 
      experience: "6 years", 
      rating: 4.3, 
      cost: 450, 
      skills: ["Lighting", "Switch Repair", "Home Wiring"],
      image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=500"
    },
    { 
      id: 6, 
      name: "Ramesh Gupta", 
      experience: "15 years", 
      rating: 5.0, 
      cost: 800, 
      skills: ["Industrial Wiring", "Generator Repair", "Electrical Safety"],
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500"
    }
  ],
  plumber: [
    { 
      id: 7, 
      name: "Sanjay Verma", 
      experience: "7 years", 
      rating: 4.6, 
      cost: 550, 
      skills: ["Pipe Fitting", "Leak Repair", "Bathroom Installations"],
      image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=500"
    },
    { 
      id: 8, 
      name: "Vijay Malhotra", 
      experience: "9 years", 
      rating: 4.7, 
      cost: 600, 
      skills: ["Water Heater", "Drain Cleaning", "Sewer Repair"],
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500"
    },
    { 
      id: 9, 
      name: "Amit Joshi", 
      experience: "4 years", 
      rating: 4.2, 
      cost: 400, 
      skills: ["Faucet Repair", "Toilet Installation", "Pipe Installation"],
      image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=500"
    }
  ],
  painter: [
    { 
      id: 10, 
      name: "Rahul Mehta", 
      experience: "5 years", 
      rating: 4.4, 
      cost: 350, 
      skills: ["Wall Painting", "Texture Finish", "Exterior Painting"],
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500"
    },
    { 
      id: 11, 
      name: "Karan Chopra", 
      experience: "8 years", 
      rating: 4.7, 
      cost: 500, 
      skills: ["Decorative Painting", "Waterproofing", "Wallpaper Installation"],
      image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=500"
    },
    { 
      id: 12, 
      name: "Nitin Ahuja", 
      experience: "12 years", 
      rating: 4.9, 
      cost: 700, 
      skills: ["Murals", "Specialty Finishes", "Commercial Painting"],
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500"
    }
  ],
  mason: [
    { 
      id: 13, 
      name: "Mahesh Yadav", 
      experience: "10 years", 
      rating: 4.8, 
      cost: 600, 
      skills: ["Brickwork", "Concrete Work", "Foundation"],
      image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=500"
    },
    { 
      id: 14, 
      name: "Suresh Reddy", 
      experience: "6 years", 
      rating: 4.5, 
      cost: 450, 
      skills: ["Block Work", "Plastering", "Retaining Walls"],
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500"
    },
    { 
      id: 15, 
      name: "Harish Patel", 
      experience: "15 years", 
      rating: 4.9, 
      cost: 750, 
      skills: ["Stone Masonry", "Structural Repair", "Custom Masonry"],
      image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=500"
    }
  ],
  welder: [
    { 
      id: 16, 
      name: "Dinesh Kumar", 
      experience: "7 years", 
      rating: 4.6, 
      cost: 500, 
      skills: ["MIG Welding", "Fabrication", "Metal Repair"],
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500"
    },
    { 
      id: 17, 
      name: "Pankaj Singh", 
      experience: "4 years", 
      rating: 4.2, 
      cost: 400, 
      skills: ["ARC Welding", "Gates", "Fence Repair"],
      image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=500"
    },
    { 
      id: 18, 
      name: "Rohit Sharma", 
      experience: "10 years", 
      rating: 4.8, 
      cost: 650, 
      skills: ["TIG Welding", "Structural Welding", "Custom Metalwork"],
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500"
    }
  ],
  mechanic: [
    { 
      id: 19, 
      name: "Vivek Malhotra", 
      experience: "8 years", 
      rating: 4.7, 
      cost: 550, 
      skills: ["Engine Repair", "Brake Service", "AC Repair"],
      image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=500"
    },
    { 
      id: 20, 
      name: "Alok Gupta", 
      experience: "5 years", 
      rating: 4.3, 
      cost: 450, 
      skills: ["Oil Change", "Tire Service", "General Maintenance"],
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500"
    },
    { 
      id: 21, 
      name: "Tarun Mehta", 
      experience: "12 years", 
      rating: 4.9, 
      cost: 700, 
      skills: ["Transmission", "Electrical Systems", "Diagnostics"],
      image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=500"
    }
  ],
  cleaner: [
    { 
      id: 22, 
      name: "Priya Sharma", 
      experience: "3 years", 
      rating: 4.5, 
      cost: 300, 
      skills: ["Deep Cleaning", "Housekeeping", "Organization"],
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500"
    },
    { 
      id: 23, 
      name: "Neha Patel", 
      experience: "5 years", 
      rating: 4.7, 
      cost: 400, 
      skills: ["Post-Construction", "Office Cleaning", "Window Cleaning"],
      image: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=500"
    },
    { 
      id: 24, 
      name: "Sunita Devi", 
      experience: "7 years", 
      rating: 4.8, 
      cost: 500, 
      skills: ["Carpet Cleaning", "Disinfection", "Move-In/Move-Out"],
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500"
    }
  ]
};

export default function CategoryPage() {
  const { categoryId } = useParams();
  const [professionals, setProfessionals] = useState([]);
  const [sortBy, setSortBy] = useState('experience');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [showFullProfile, setShowFullProfile] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Simulate API call
    const categoryPros = professionalsData[categoryId] || [];
    setProfessionals(categoryPros);
  }, [categoryId]);

  const sortedProfessionals = [...professionals].sort((a, b) => {
    if (sortBy === 'experience') {
      return parseInt(b.experience) - parseInt(a.experience);
    } else if (sortBy === 'cost') {
      return a.cost - b.cost;
    } else if (sortBy === 'rating') {
      return b.rating - a.rating;
    }
    return 0;
  });

  const filteredProfessionals = sortedProfessionals.filter(pro => 
    pro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pro.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const categoryTitles = {
    carpenter: "Carpenters",
    electrician: "Electricians",
    plumber: "Plumbers",
    painter: "Painters",
    mason: "Masons",
    welder: "Welders",
    mechanic: "Mechanics",
    cleaner: "Cleaners"
  };

  const handleProfileClick = (professional) => {
    setSelectedProfessional(professional);
    setShowFullProfile(true);
  };

  const handleCloseFullProfile = () => {
    setShowFullProfile(false);
    setSelectedProfessional(null);
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.header}>
        <h1 className={styles.title}>{categoryTitles[categoryId] || "Professionals"}</h1>
        <p className={styles.subtitle}>Browse and hire skilled professionals in this category</p>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBox}>
          <input 
            type="text" 
            placeholder="Search by name or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <span className={styles.searchIcon}>🔍</span>
          <button className={styles.searchButton}>Search</button>
        </div>

        <div className={styles.sortOptions}>
          <label className={styles.sortLabel}>Sort by:</label>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="experience">Experience</option>
            <option value="rating">Rating</option>
            <option value="cost">Hourly Cost</option>
          </select>
        </div>
      </div>

      {/* Professionals List View */}
      <div className={styles.professionalsList}>
        {filteredProfessionals.length > 0 ? (
          filteredProfessionals.map(professional => (
            <div key={professional.id} className={styles.professionalItem}>
              <div className={styles.proAvatar}>
                <img src={professional.image} alt={professional.name} />
              </div>
              
              <div className={styles.proDetails}>
                <h3 className={styles.proName}>{professional.name}</h3>
                
                <div className={styles.proMeta}>
                  <span className={styles.proMetaItem}>
                    <i className="fas fa-briefcase"></i> {professional.experience}
                  </span>
                  <span className={styles.proMetaItem}>
                    <i className="fas fa-star"></i> {professional.rating}
                  </span>
                  <span className={styles.proMetaItem}>
                    <i className="fas fa-rupee-sign"></i> ₹{professional.cost}/hr
                  </span>
                </div>
                
                <div className={styles.proSkills}>
                  {professional.skills.slice(0, 3).map((skill, i) => (
                    <span key={i} className={styles.proSkillTag}>{skill}</span>
                  ))}
                  {professional.skills.length > 3 && (
                    <span className={styles.proSkillTag}>+{professional.skills.length - 3}</span>
                  )}
                </div>

              </div>
              
              <div className={styles.proActions}>
                <button 
                  onClick={() => handleProfileClick(professional)}
                  className={styles.proViewBtn}
                >
                  <FaUser className={styles.buttonIcon} />
                  Profile
                </button>
                <button className={styles.proHireBtn}>
                  <FaHandshake className={styles.buttonIcon} />
                  Hire
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>
            <p className={styles.noResultsText}>No professionals found matching your criteria</p>
            <Link to="/categories" className={styles.browseLink}>
              Browse other categories
            </Link>
          </div>
        )}
      </div>

      {showFullProfile && selectedProfessional && (
        <FullProfile helper={selectedProfessional} onClose={handleCloseFullProfile} />
      )}
    </div>
  );
}