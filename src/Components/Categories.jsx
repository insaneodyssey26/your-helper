import { Link } from "react-router-dom";
import classes from "./Categories.module.css";
import { useEffect, useRef, useState } from "react";

const categories = [
  {
    id: "carpenter",
    title: "Carpenters",
    icon: "🪚",
    description: "Skilled woodworkers for furniture, cabinets, and installations",
    stats: "500+ Professionals",
  },
  {
    id: "electrician",
    title: "Electricians",
    icon: "🔌",
    description: "Wiring, repairs, and electrical installations",
    stats: "650+ Professionals",
  },
  {
    id: "plumber",
    title: "Plumbers",
    icon: "🚿",
    description: "Pipe installations, repairs, and bathroom fittings",
    stats: "700+ Professionals",
  },
  {
    id: "painter",
    title: "Painters",
    icon: "🎨",
    description: "Interior/exterior painting and wall treatments",
    stats: "450+ Professionals",
  },
  {
    id: "mason",
    title: "Masons",
    icon: "🧱",
    description: "Brickwork, concrete, and structural construction",
    stats: "600+ Professionals",
  },
  {
    id: "welder",
    title: "Welders",
    icon: "🔧",
    description: "Metal fabrication and repair services",
    stats: "300+ Professionals",
  },
  {
    id: "mechanic",
    title: "Mechanics",
    icon: "🚗",
    description: "Vehicle repair and maintenance specialists",
    stats: "550+ Professionals",
  },
  {
    id: "cleaner",
    title: "Cleaners",
    icon: "🧹",
    description: "Deep cleaning and maintenance services",
    stats: "800+ Professionals",
  },
];

export default function Categories() {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = entry.target.getAttribute('data-card-id');
            setVisibleCards(prev => [...new Set([...prev, cardId])]);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px"
      }
    );

    const cards = document.querySelectorAll(`.${classes.card}`);
    cards.forEach(card => observer.observe(card));

    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, []);

  return (
    <section className={classes.section} ref={sectionRef}>
      <div className={classes.container}>
        <div className={classes.header}>
          <h2 className={classes.title}>Browse Services</h2>
          <p className={classes.subtitle}>
            Find skilled professionals for every need
          </p>
        </div>

        <div className={classes.grid}>
          {categories.map((category, index) => (
            <Link
              to={`/category/${category.id}`}
              className={`${classes.card} ${visibleCards.includes(category.id) ? classes.visible : ''}`}
              key={category.id}
              data-card-id={category.id}
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className={classes.icon}>{category.icon}</div>
              <h3 className={classes.cardTitle}>{category.title}</h3>
              <p className={classes.description}>{category.description}</p>
              <div className={classes.statsContainer}>
                <span className={classes.statsText}>{category.stats}</span>
                <span className={classes.exploreLink}>Explore →</span>
              </div>
            </Link>
          ))}
        </div>

        <div className={classes.ctaSection}>
          <p className={classes.ctaText}>Can't find your specific need?</p>
          <Link to="/contact" className={classes.ctaButton}>
            Request Custom Service
          </Link>
        </div>
      </div>
    </section>
  );
}
