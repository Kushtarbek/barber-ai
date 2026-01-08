import React, { useState } from "react";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import About from "./components/About";
import Footer from "./components/Footer";
import Admin from "./components/Admin";

const App: React.FC = () => {
  const [isAdminPage, setIsAdminPage] = useState(false);

  // Check if we're on admin page from URL
  React.useEffect(() => {
    const isAdmin = window.location.pathname === "/admin";
    setIsAdminPage(isAdmin);

    // Handle navigation
    const handlePopState = () => {
      setIsAdminPage(window.location.pathname === "/admin");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const handleAdminNav = () => {
    window.history.pushState(null, "", "/admin");
    setIsAdminPage(true);
  };

  const handleBackNav = () => {
    window.history.pushState(null, "", "/");
    setIsAdminPage(false);
  };

  // Store functions in window for use in other components
  (window as any).navigateToAdmin = handleAdminNav;
  (window as any).navigateBack = handleBackNav;

  if (isAdminPage) {
    return <Admin />;
  }

  return (
    <div>
      <Hero />
      <Services />
      <Gallery />
      <About />
      <Footer />
    </div>
  );
};

export default App;
