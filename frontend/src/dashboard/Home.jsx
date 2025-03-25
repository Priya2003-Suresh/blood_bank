import React, { useState, useEffect } from "react";
import "./Home.css"; // Assuming you use an external CSS file

export const images = ["1.jpg", "banner1.jpg", "3.jpg", "banner2.jpg"];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Header */}
      <div className="header">
        <div className="logo">BBDMS</div>
        <nav className="nav">
          <a href="#home" onClick={() => setActiveSection("home")}>Home</a>
          <a href="#about" onClick={() => setActiveSection("about")}>About Us</a>
          <a href="#contact" onClick={() => setActiveSection("contact")}>Contact Us</a>
          <a href="#donate">Donate List</a>
          <a href="#search">Search Donor</a>
          <a href="t.html" className="button">Login</a>
        </nav>
      </div>

      {/* Hero Section */}
      {activeSection === "home" && (
        <div
          className="hero"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        >
          <h1>One Blood Donation Saves Three Lives <span className="highlight">every day</span></h1>
        </div>
      )}

      {/* Bottom Section */}
      {activeSection === "home" && (
        <div className="bottom-section">
          <div className="bottom-content">
            <p>All specialists have extensive practical experience and regularly train in educational centers around the world.</p>
            <a href="#" className="button">Read More</a>
          </div>
        </div>
      )}

      {/* About Section */}
      {activeSection === "about" && (
        <div className="about-section">
          <h2>About Us</h2>
          <p>
            We are committed to saving lives by connecting blood donors with those in need. Our mission is to ensure a safe and reliable blood supply for hospitals and clinics. Through technology and community support, we strive to make the process easy, efficient, and accessible.
          </p>
        </div>
      )}

      {/* Contact Section */}
      {activeSection === "contact" && (
        <div className="contact-section">
          <h2>Get In Touch</h2>
          <div className="contact-container">
            <div className="contact-image">
              <img src="" alt="Blood donation" />
            </div>
            <div className="contact-form">
              <input type="text" placeholder="Please enter your name." />
              <input type="text" placeholder="Please enter your phone number." />
              <input type="email" placeholder="Please enter your email address." />
              <textarea placeholder="Please enter your message"></textarea>
              <button>Send Message</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
