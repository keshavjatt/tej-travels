"use client";

import { useState } from "react";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import { FaLocationArrow, FaMapPin } from "react-icons/fa";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicmFodWxzYWhuaTE2OSIsImEiOiJjbHprM3I0bHMwbmIzMmtyMHQ0d3Q2aDF1In0.rNhynN4QO1to7V1A94vT0Q";

// Supabase setup
const SUPABASE_URL = "https://fgcvmbrvxniokscuukvd.supabase.co"; // Replace with your Supabase URL
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnY3ZtYnJ2eG5pb2tzY3V1a3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0OTg2MDUsImV4cCI6MjA0MjA3NDYwNX0.5q2krAQ8lrkuiYx84tHoQs4fEqEcNKO54fDcrHEL1AQ"; // Replace with your Supabase anon key

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

interface Suggestion {
  place_name: string;
}

interface FormState {
  tripStartDate: string;
  tripStartTime: string;
  tripEndDate: string;
  phoneNumber: string;
}

export default function Hero() {
  const [pickup, setPickup] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [pickupSuggestions, setPickupSuggestions] = useState<Suggestion[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<Suggestion[]>([]);
  const [form, setForm] = useState<FormState>({
    tripStartDate: "",
    tripStartTime: "",
    tripEndDate: "",
    phoneNumber: "",
  });
  
  const [showModal, setShowModal] = useState<boolean>(false); // Controls the visibility of the modal
const [submittedData, setSubmittedData] = useState<FormState | null>(null);

  const fetchSuggestions = async (
    query: string,
    setter: React.Dispatch<React.SetStateAction<Suggestion[]>>
  ) => {
    if (!query) {
      setter([]);
      return;
    }

    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json`,
        {
          params: {
            access_token: MAPBOX_TOKEN,
            autocomplete: true,
            limit: 5,
          },
        }
      );
      setter(response.data.features as Suggestion[]);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handlePickupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setPickup(query);
    fetchSuggestions(query, setPickupSuggestions);
  };

  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setDestination(query);
    fetchSuggestions(query, setDestinationSuggestions);
  };

  const handlePickupSelect = (placeName: string) => {
    setPickup(placeName);
    setPickupSuggestions([]);
  };

  const handleDestinationSelect = (placeName: string) => {
    setDestination(placeName);
    setDestinationSuggestions([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const { tripStartDate, tripStartTime, tripEndDate, phoneNumber } = form;
  
    try {
      // Insert data into the database using Supabase
      const { data, error } = await supabase
        .from("customer_data")
        .insert([
          {
            pickup_city: pickup,
            destination_city: destination,
            trip_start_date: tripStartDate,
            trip_start_time: tripStartTime,
            trip_end_date: tripEndDate,
            phone_number: phoneNumber,
            status: "enquiry",
          },
        ])
        .select("id");
  
      if (error) {
        console.error("Supabase Error:", error);
        alert("Failed to insert data. Check console for details.");
        return;
      }
  
      if (data && data.length > 0) {
        const insertedId = data[0].id; // Extract the inserted ID
        console.log("Inserted ID:", insertedId);
  
        // Set submitted data and show the modal
        setSubmittedData({
          tripStartDate,
          tripStartTime,
          tripEndDate,
          phoneNumber,
        });
  
        setShowModal(true);
  
        // Send details through Ultra Message API
        try {
          const qs = new URLSearchParams();
          qs.append("token", "wbky2j7xuofk2aeb"); // Replace with your Ultra Message API token
          qs.append("to", "+918368154854"); // Recipient phone number in international format (e.g., +123456789)
          qs.append(
            "body",
            `New Enquiry at Tej Travels:
  - Pickup City: ${pickup}
  - Destination City: ${destination}
  - Trip Start Date: ${tripStartDate}
  - Trip Start Time: ${tripStartTime}
  - Trip End Date: ${tripEndDate}
  - Phone Number : ${phoneNumber}
  `
          );
  
          const response = await fetch(
            `https://api.ultramsg.com/instance103596/messages/chat`, // Replace with your instance ID
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: qs.toString(),
            }
          );
  
          const result = await response.json();
  
          if (response.ok) {
            console.log("Message sent successfully:", result);
            // alert("Message sent to the customer!");
          } else {
            console.error("Ultra Message API Error:", result);
            alert("Failed to send the message. Check console for details.");
          }
        } catch (apiError) {
          console.error("Error sending message via Ultra Message API:", apiError);
          alert("An error occurred while sending the message. Check console for details.");
        }
  
        // Reset form
        setForm({
          tripStartDate: "",
          tripStartTime: "",
          tripEndDate: "",
          phoneNumber: "",
        });
      }
    } catch (err) {
      console.error("Unexpected Error:", err);
      alert("Unexpected error occurred. Check console for details.");
    }
  };
  
  
  

  return (
    <section className="section hero" id="home">
      <div className="container">
        <div className="hero-content">
          <h2 className="h1 hero-title">Trusted Cab and Taxi Service</h2>
          <p className="hero-text">Book rides from Delhi NCR with easily</p>
        </div>

        <div className="mobile-banner"></div>

        <div className="hero-banner"></div>

        <div className="round-trip-indicator flex items-center gap-2 mb-6">
          <span className="online-dot w-3 h-3 rounded-full bg-green-500"></span>
          <span className="text-green-500 font-bold text-sm">Round Trips</span>
        </div>

        <form className="hero-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="pickup-city" className="input-label flex items-center gap-2">
              <FaLocationArrow className="text-primary-color" /> Pickup City
            </label>
            <input
              type="text"
              id="pickup-city"
              className="input-field"
              placeholder="Enter pickup city"
              value={pickup}
              onChange={handlePickupChange}
              required
            />
            {pickupSuggestions.length > 0 && (
              <ul className="suggestion-list">
                {pickupSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="suggestion-item"
                    onClick={() => handlePickupSelect(suggestion.place_name)}
                  >
                    {suggestion.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="input-wrapper">
            <label htmlFor="destination-city" className="input-label flex items-center gap-2">
              <FaMapPin className="text-primary-color" /> Destination City
            </label>
            <input
              type="text"
              id="destination-city"
              className="input-field"
              placeholder="Enter destination city"
              value={destination}
              onChange={handleDestinationChange}
              required
            />
            {destinationSuggestions.length > 0 && (
              <ul className="suggestion-list">
                {destinationSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="suggestion-item"
                    onClick={() => handleDestinationSelect(suggestion.place_name)}
                  >
                    {suggestion.place_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="input-wrapper">
            <label htmlFor="trip-start" className="input-label">
              Trip Start Date
            </label>
            <input
              type="date"
              name="tripStartDate"
              id="trip-start"
              className="input-field"
              value={form.tripStartDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="trip-start-time" className="input-label">
              Trip Start Time
            </label>
            <input
              type="time"
              name="tripStartTime"
              id="trip-start-time"
              className="input-field"
              value={form.tripStartTime}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="trip-end" className="input-label">
              Trip End Date
            </label>
            <input
              type="date"
              name="tripEndDate"
              id="trip-end"
              className="input-field"
              value={form.tripEndDate}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="phone-number" className="input-label">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phone-number"
              className="input-field"
              placeholder="Enter your phone number"
              value={form.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn">
            Search Now
          </button>
        </form>
      </div>

      {showModal && (
  <div className="modal-overlay">
    <div className="modal">
      <h3 className="modal-title">🎉 Enquiry Submitted Successfully!</h3>
      <p className="modal-message">Thank you for your enquiry. Our team will contact you soon. or contact us at +91 83681 54854</p>
      <div className="modal-details">
        <p>
          <strong>Pickup City:</strong> {pickup}
        </p>
        <p>
          <strong>Destination City:</strong> {destination}
        </p>
        <p>
          <strong>Trip Start Date:</strong> {submittedData?.tripStartDate}
        </p>
        <p>
          <strong>Trip Start Time:</strong> {submittedData?.tripStartTime}
        </p>
        <p>
          <strong>Trip End Date:</strong> {submittedData?.tripEndDate}
        </p>
        <p>
          <strong>Phone Number:</strong> {submittedData?.phoneNumber}
        </p>
      </div>
      <button className="modal-close-btn" onClick={() => setShowModal(false)}>
        Close
      </button>
    </div>
  </div>
)}
    </section>
  );
}
