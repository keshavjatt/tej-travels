"use client";

import { FaUser, FaCar, FaMapMarkerAlt, FaSmile } from "react-icons/fa";

export default function GetStarted() {
  const steps = [
    {
      id: 1,
      title: "Create Your Profile",
      description:
        "Sign up with your details and preferences to get started with our cab booking service.",
      icon: <FaUser size="2rem" style={{ color: "#007bff" }} />,
    },
    {
      id: 2,
      title: "Choose Your Ride",
      description:
        "Browse and select the perfect cab that suits your travel needs and budget.",
      icon: <FaCar size="2rem" style={{ color: "#28a745" }} />,
    },
    {
      id: 3,
      title: "Set Your Journey",
      description:
        "Provide your pickup and drop-off locations, schedule your ride, and confirm the trip.",
      icon: <FaMapMarkerAlt size="2rem" style={{ color: "#ffc107" }} />,
    },
    {
      id: 4,
      title: "Enjoy the Ride",
      description:
        "Sit back and relax as our professional drivers take you to your destination safely and on time.",
      icon: <FaSmile size="2rem" style={{ color: "#dc3545" }} />,
    },
  ];

  return (
    <section className="section get-start">
      <div className="container">
        <h2 className="h2 section-title">Travel with us in 4 Simple Steps</h2>
        <ul className="get-start-list" style={{ listStyle: "none", padding: 0 }}>
          {steps.map((step) => (
            <li key={step.id} style={{ marginBottom: "2rem" }}>
              <div
                className="get-start-card"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  padding: "1.5rem",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
              >
                <div
                  className={`card-icon icon-${step.id}`}
                  style={{
                    width: "3rem",
                    height: "3rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: "50%",
                    background: "#f9f9f9",
                  }}
                >
                  {step.icon}
                </div>
                <div>
                  <h3
                    className="card-title"
                    style={{
                      fontSize: "1.25rem",
                      margin: "0 0 0.5rem",
                      color: "#333",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="card-text"
                    style={{ fontSize: "1rem", color: "#555", margin: 0 }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
