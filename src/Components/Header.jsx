import { Link } from "react-router-dom";
export default function Header() {
  const NAVELEMENTS = [
    { id: "", title: "Home" },
    { id: "categories", title: "Categories" },
    { id: "about", title: "About" },
    { id: "contact", title: "Contact" },
    { id: "login", title: "Login" },
    { id: "signup", title: "Sign Up" },
  ];
  return (
    <>
      <header className="header">
        <nav className="nav-container">
          <ul>
            {NAVELEMENTS.map((navelement) => (
              <li key={navelement.id}>
                <Link to={navelement.id}>{navelement.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
