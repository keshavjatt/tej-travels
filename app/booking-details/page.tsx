"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import { createClient } from "@supabase/supabase-js";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaDownload,
  FaShareAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaCar,
} from "react-icons/fa";
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone } from "react-icons/ai";

// Supabase configuration
const SUPABASE_URL = "https://fgcvmbrvxniokscuukvd.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnY3ZtYnJ2eG5pb2tzY3V1a3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0OTg2MDUsImV4cCI6MjA0MjA3NDYwNX0.5q2krAQ8lrkuiYx84tHoQs4fEqEcNKO54fDcrHEL1AQ";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

interface BookingDetails {
  username: string;
  email: string;
  phone_number: string;
  pickup_city: string;
  destination_city: string;
  trip_start_date: string;
  trip_start_time: string;
  trip_end_date: string;
  car_type: string;
  total_distance: number;
  total_bill_amount: number;
  paid_amount: number;
  payment_status: string;
}

// BookingContent Component
function BookingContent() {
  const searchParams = useSearchParams();
  const customerId = searchParams.get("id");
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!customerId) return;

      try {
        const { data, error } = await supabase
          .from("customer_data")
          .select("*")
          .eq("id", customerId)
          .single();

        if (error) {
          console.error("Error fetching booking details:", error.message);
        } else {
          setBookingDetails(data as BookingDetails);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [customerId]);

  const downloadTicket = () => {
    if (!ticketRef.current) return;

    html2canvas(ticketRef.current).then((canvas) => {
      canvas.toBlob((blob) => {
        if (blob) saveAs(blob, `booking_${customerId}.png`);
      });
    });
  };

  const shareTicket = () => {
    alert("Sharing feature will be implemented.");
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontSize: "1.5rem",
          color: "#333",
        }}
      >
        Loading your booking details...
      </div>
    );
  }

  if (!bookingDetails) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontSize: "1.5rem",
          color: "#333",
        }}
      >
        Booking not found.
      </div>
    );
  }

  const isBookingConfirmed = bookingDetails.payment_status === "success";

  const balanceAmount = isBookingConfirmed
    ? Math.round(bookingDetails.total_bill_amount) -
      Math.round(bookingDetails.paid_amount)
    : bookingDetails.total_bill_amount;

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "50px auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        ref={ticketRef}
        style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "20px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          position: "relative",
          overflow: "hidden",
          border: "1px solid #ccc",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <img
            src="/assets/images/logo.png"
            alt="Company Logo"
            style={{ height: "50px" }}
          />
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "14px", color: "#666" }}>
              <strong>Contact Us:</strong> +91 83681 54854
            </p>
            <p style={{ fontSize: "14px", color: "#666" }}>
              Email: support@tejtravels.in
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            margin: "20px 0 30px",
          }}
        >
          {isBookingConfirmed ? (
            <>
              <FaCheckCircle
                size={64}
                color="#28a745"
                style={{ marginBottom: "10px" }}
              />
              <h2
                style={{
                  color: "#28a745",
                  fontWeight: "600",
                }}
              >
                Booking Confirmed!
              </h2>
            </>
          ) : (
            <>
              <FaTimesCircle
                size={64}
                color="#dc3545"
                style={{ marginBottom: "10px" }}
              />
              <h2
                style={{
                  color: "#dc3545",
                  fontWeight: "600",
                }}
              >
                Booking Not Confirmed!
              </h2>
            </>
          )}
        </div>

        <hr style={{ margin: "20px 0", borderColor: "#ddd" }} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <AiOutlineUser style={{ color: "#888" }} />
            <span>
              <strong>Name:</strong> {bookingDetails.username}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <AiOutlineMail style={{ color: "#888" }} />
            <span>
              <strong>Email:</strong> {bookingDetails.email}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <AiOutlinePhone style={{ color: "#888" }} />
            <span>
              <strong>Phone:</strong> {bookingDetails.phone_number}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaMapMarkerAlt style={{ color: "#888" }} />
            <span>
              <strong>Pickup:</strong> {bookingDetails.pickup_city}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaMapMarkerAlt style={{ color: "#888" }} />
            <span>
              <strong>Destination:</strong> {bookingDetails.destination_city}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaCalendarAlt style={{ color: "#888" }} />
            <span>
              <strong>Start Date:</strong> {bookingDetails.trip_start_date}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaCalendarAlt style={{ color: "#888" }} />
            <span>
              <strong>End Date:</strong> {bookingDetails.trip_end_date}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <FaCar style={{ color: "#888" }} />
            <span>
              <strong>Car Type:</strong> {bookingDetails.car_type}
            </span>
          </div>
        </div>

        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <p>
            <strong>Total Distance:</strong>{" "}
            {Math.round(bookingDetails.total_distance)} km
          </p>
          <p>
            <strong>Total Amount:</strong> ₹{bookingDetails.total_bill_amount}
          </p>
          <p>
            <strong>Paid Amount:</strong> ₹{bookingDetails.paid_amount}
          </p>
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              color: "#007bff",
            }}
          >
            <strong>Balance Amount:</strong> ₹{balanceAmount}
          </p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
            gap: "20px",
          }}
        >
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              background: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={downloadTicket}
          >
            <FaDownload />
            Download
          </button>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 20px",
              background: "#28a745",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={shareTicket}
          >
            <FaShareAlt />
            Share
          </button>
        </div>
      </div>
    </div>
  );
}

// Main BookingConfirmed Component
export default function BookingConfirmed() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <BookingContent />
      </Suspense>
      <Footer />
    </>
  );
}
