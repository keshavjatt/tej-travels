"use client";

import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation"; // For Next.js navigation

const SUPABASE_URL = "https://fgcvmbrvxniokscuukvd.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnY3ZtYnJ2eG5pb2tzY3V1a3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0OTg2MDUsImV4cCI6MjA0MjA3NDYwNX0.5q2krAQ8lrkuiYx84tHoQs4fEqEcNKO54fDcrHEL1AQ";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  image: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
}

interface Car {
  name: string;
}

export default function BookingModal({
  isOpen,
  onClose,
  distanceCharge,
  phoneNumber,
  totalDistance,
  car,
  customerId,
}: {
  isOpen: boolean;
  onClose: () => void;
  distanceCharge: number;
  phoneNumber: string | null;
  car: Car;
  totalDistance: number;
  customerId: number | null;
}) {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const tenPercentAmount = distanceCharge ? (distanceCharge * 0.1).toFixed(2) : "0.00";

  const router = useRouter();

  const handlePayment = async () => {
    if (!customerId) {
      alert("Customer ID is missing. Cannot update booking.");
      return;
    }

    try {
      const { error: updateError } = await supabase
        .from("customer_data")
        .update({
          username,
          email,
          total_distance: totalDistance,
          paid_amount: parseFloat(tenPercentAmount),
          total_bill_amount: parseFloat(distanceCharge.toFixed(2)),
          status: "initiated",
          car_type: car.name,
        })
        .eq("id", customerId);

      if (updateError) {
        console.error("Error updating booking data:", updateError.message);
        alert("Failed to update booking. Please try again.");
        return;
      }

      const options: RazorpayOptions = {
        key: "rzp_test_dHxVi72AXeegZ8",
        amount: Math.round(parseFloat(tenPercentAmount) * 100),
        currency: "INR",
        name: "Tej Travels",
        description: `Booking for ${car.name}`,
        image: "/assets/images/logo.png",
        handler: async function (response) {
          const { error: paymentError } = await supabase
            .from("customer_data")
            .update({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              payment_status: "success",
              status: "confirmed",
            })
            .eq("id", customerId);

          if (paymentError) {
            console.error("Error updating payment data:", paymentError.message);
            alert("Payment succeeded but failed to update the database. Contact support.");
          }

          router.push(`/booking-details?id=${customerId}`);
        },
        prefill: {
          name: username,
          email,
          contact: phoneNumber || "",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: async function () {
            const { error: dismissError } = await supabase
              .from("customer_data")
              .update({
                payment_status: "failed",
                status: "retry",
              })
              .eq("id", customerId);

            if (dismissError) {
              console.error("Error updating payment status to failed:", dismissError.message);
              alert("Failed to update payment status. Contact support.");
            }

            alert("Payment process was canceled. Please try again.");
            router.push(`/booking-details?id=${customerId}`);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initiation failed:", err);

      const { error: paymentFailedError } = await supabase
        .from("customer_data")
        .update({
          payment_status: "failed",
          status: "retry",
        })
        .eq("id", customerId);

      if (paymentFailedError) {
        console.error("Error updating payment status to failed:", paymentFailedError.message);
      }

      alert("Failed to initiate payment. Please try again.");
      router.push(`/booking-details?id=${customerId}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(5px)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "relative",
          maxWidth: "500px",
          width: "90%",
          background: "#ffffff",
          borderRadius: "16px",
          padding: "24px",
          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            fontSize: "1.2rem",
            color: "#888",
            cursor: "pointer",
          }}
        >
          ✖
        </button>
        <h3
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#333",
            marginBottom: "16px",
            textAlign: "center",
          }}
        >
          {`Booking for ${car.name}`}
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handlePayment();
          }}
        >
          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="username"
              style={{
                fontSize: "0.9rem",
                fontWeight: "500",
                color: "#555",
                marginBottom: "6px",
                display: "block",
              }}
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "0.9rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="email"
              style={{
                fontSize: "0.9rem",
                fontWeight: "500",
                color: "#555",
                marginBottom: "6px",
                display: "block",
              }}
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "0.9rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                outline: "none",
              }}
            />
          </div>
          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="phone"
              style={{
                fontSize: "0.9rem",
                fontWeight: "500",
                color: "#555",
                marginBottom: "6px",
                display: "block",
              }}
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={phoneNumber || ""}
              disabled
              style={{
                width: "100%",
                padding: "12px",
                fontSize: "0.9rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                outline: "none",
                backgroundColor: "#f1f1f1",
              }}
            />
          </div>
          <div
            style={{
              marginTop: "16px",
              padding: "12px",
              background: "#f8f9fa",
              borderRadius: "8px",
              fontSize: "1.2rem",
              fontWeight: "600",
              textAlign: "center",
              color: "#28a745",
            }}
          >
            Total Amount: ₹{tenPercentAmount} <p>( 10% advance of total amount ) </p>
          </div>
          <button
            type="submit"
            style={{
              marginTop: "16px",
              width: "100%",
              padding: "12px",
              background: "#007bff",
              color: "#fff",
              fontSize: "1rem",
              fontWeight: "600",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = "#0056b3")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = "#007bff")
            }
          >
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
}
