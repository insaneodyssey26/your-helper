import { NavLink } from "react-router-dom";
import classes from "./Header.module.css";
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
      <header className={classes.header}>
        <nav className={classes["nav-container"]}>
          <ul>
            {NAVELEMENTS.map((navelement) => (
              <li key={navelement.id}>
                <NavLink to={navelement.id} className={({isActive})=>isActive? classes.active : undefined}>{navelement.title}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
