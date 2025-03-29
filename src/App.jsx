import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from "./Components/About.jsx";
import Contact from "./Components/Contact.jsx";
import Categories from "./Components/Categories.jsx";
import RootLayout from "./Components/RootLayout.jsx";
import HeroSection from "./Components/HeroSection.jsx";
import Login from "./Components/Login.jsx";
import SignUp from "./Components/SignUp";
import ForgotPassword from './Components/ForgotPassword';
import CategoryPage from "./Components/CategoryPage.jsx";
import "./styles.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HeroSection />} />
          <Route path="categories" element={<Categories />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="category/:categoryId" element={<CategoryPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
