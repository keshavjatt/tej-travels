"use client";

import Image from "next/image";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa"; // Importing React Icons

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="logo">
              <Image src="/assets/images/logo.png" alt="Tej Travels logo" width={100} height={200} />
            </a>
            <p className="footer-text">
            Tej Travels offers relaible  and affordable cab and Taxi booking services from Delhi NCR to across India.
             Whether youre travelling locally or across cities, our well maintained Vehicles and experience Driver make your journey comfortable every time
            </p>
          </div>
          <ul className="footer-list">
            <li>
              <p className="footer-list-title">Company</p>
            </li>
            <li>
              <a href="/about-us" className="footer-link">About Us</a>
            </li>
            <li>
              <a href="#" className="footer-link">Our Services</a>
            </li>
            <li>
              <a href="#" className="footer-link">Customer Reviews</a>
            </li>
            <li>
              <a href="/contact-us" className="footer-link">Contact Us</a>
            </li>
          </ul>
          <ul className="footer-list">
            <li>
              <p className="footer-list-title">Support</p>
            </li>
            <li>
              <a href="#" className="footer-link">FAQs</a>
            </li>
            <li>
              <a href="#" className="footer-link">Booking Help</a>
            </li>
            <li>
              <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
            </li>
            <li>
              <a href="/refund-policy" className="footer-link">Refund Policy</a>
            </li>
            <li>
              <a href="/terms-and-conditions" className="footer-link">Terms & Conditions</a>
            </li>
          </ul>
          <ul className="footer-list">
            <li>
              <p className="footer-list-title">Popular Routes</p>
            </li>
            <li>
              <a href="#" className="footer-link">Delhi to Agra</a>
            </li>
            <li>
              <a href="#" className="footer-link">Mumbai to Pune</a>
            </li>
            <li>
              <a href="#" className="footer-link">Bangalore to Mysore</a>
            </li>
            <li>
              <a href="#" className="footer-link">Chennai to Pondicherry</a>
            </li>
            <li>
              <a href="#" className="footer-link">Jaipur to Udaipur</a>
            </li>
            <li>
              <a href="#" className="footer-link">Hyderabad to Warangal</a>
            </li>
          </ul>
        </div>
        <div className="footer-bottom">
          <ul className="social-list" style={{ display: "flex", gap: "15px", padding: 0 }}>
            <li>
              <a
                href="https://www.facebook.com/share/1Cr4Et17bE/?mibextid=wwXIfr"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "1.5rem", color: "#3b5998" }}
              >
                <FaFacebook />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/tejinfotravels"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "1.5rem", color: "#E4405F" }}
              >
                <FaInstagram />
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "1.5rem", color: "#1DA1F2" }}
              >
                <FaTwitter />
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com"
                className="social-link"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "1.5rem", color: "#0077B5" }}
              >
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a
                href="mailto:support@tejtravels.in"
                className="social-link"
                style={{ fontSize: "1.5rem", color: "#EA4335" }}
              >
                <FaEnvelope />
              </a>
            </li>
          </ul>
          <p className="copyright" style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#555" }}>
            &copy; 2025{" "}
            <a
              href="#"
              style={{ textDecoration: "none", color: "#007bff" }}
            >
       . Tej Travels All Rights Reserved.
            </a>
           
          </p>
        </div>
      </div>
    </footer>
  );
}
