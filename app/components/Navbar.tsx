"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [isNavActive, setIsNavActive] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleNavbar = () => {
    setIsNavActive(!isNavActive);
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsNavActive(false); // Close navbar after clicking a link
    }
  };

  const handleHomeClick = () => {
    if (pathname === "/") {
      scrollToSection("home");
    } else {
      router.push("/");
    }
  };

  return (
    <header className="header" data-header>
      <div className="container">
        <div
          className={`overlay ${isNavActive ? "active" : ""}`}
          data-overlay
          onClick={toggleNavbar}
        ></div>
        <a href="#" className="logo">
          <img src="/assets/images/logo.png" alt="Tej Travels logo" />
        </a>
        <nav className={`navbar ${isNavActive ? "active" : ""}`} data-navbar>
          <ul className="navbar-list">
            <li>
              <button className="navbar-link" onClick={handleHomeClick}>
                Home
              </button>
            </li>
            <li>
              <button
                className="navbar-link"
                onClick={() => scrollToSection("featured-car")}
              >
                Explore places
              </button>
            </li>
            <li>
              <button
                className="navbar-link"
                onClick={() => scrollToSection("about-us")}
              >
                About us
              </button>
            </li>
            <li>
              <button
                className="navbar-link"
                onClick={() => scrollToSection("blog")}
              >
                Blog
              </button>
            </li>
          </ul>
        </nav>
        <div className="header-actions">
  <div className="header-contact">
    <a href="mailto:info@tejtravels.in" className="contact-link">
      info@tejtravels.in
    </a>
    <span className="contact-time">Email</span>
  </div>

  <div className="vertical-line"><span className="vspan">contact us:</span>+91 83681 54854</div> {/* Separator */}

  <div className="header-contact">
    <a href="tel:+918368154854" className="contact-link">
      +91 83681 54854
    </a>
    <span className="contact-time">Mon - Sun: 9:00 am - 10:00 pm</span>
  </div>
</div>

      </div>
    </header>
  );
}
