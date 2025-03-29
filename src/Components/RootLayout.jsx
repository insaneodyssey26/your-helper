import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import bgImage from "../Images/background-image.jpg";
export default function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <img src={bgImage} className="bgImage" />
      </main>
      <Outlet />
    </>
  );
}
