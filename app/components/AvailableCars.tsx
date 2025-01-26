"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import BookingModal from "./BookingModal";
import { FaUsers, FaBolt, FaTachometerAlt, FaMicrochip } from "react-icons/fa"; // Import icons from React Icons

// Supabase setup
const SUPABASE_URL = "https://fgcvmbrvxniokscuukvd.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZnY3ZtYnJ2eG5pb2tzY3V1a3ZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY0OTg2MDUsImV4cCI6MjA0MjA3NDYwNX0.5q2krAQ8lrkuiYx84tHoQs4fEqEcNKO54fDcrHEL1AQ";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Define Car Interface
interface Car {
  id: number;
  name: string;
  year: number;
  price_per_km: number;
  image_url: string;
  seats: number;
  toll_n_taxes: string;
  transmission: string;
}

export default function AvailableCars({
  distance,
  phoneNumber,
}: {
  distance: number | null;
  phoneNumber: string | null;
}) {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data, error } = await supabase.from("cars").select("*");
        if (error) {
          console.error("Error fetching cars:", error);
        } else {
          setCars(data as Car[]);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <p className="text-center text-lg font-semibold">Loading cars...</p>;
  }

  if (cars.length === 0) {
    return <p className="text-center text-lg font-semibold">No cars available</p>;
  }

  return (
    <section className="section featured-car" id="featured-car" style={{ marginTop: -100 }}>
      <div className="container">
        <div className="title-wrapper">
          <h2 className="h2 section-title">Available Cars</h2>
        </div>
        <ul className="featured-car-list">
          {cars.map((car) => {
            const distanceCharge = distance ? distance * car.price_per_km : 0;

            return (
              <li key={car.id}>
                <div className="featured-car-card">
                  <figure className="card-banner">
                    <img
                      src={car.image_url}
                      alt={`${car.name} ${car.year}`}
                      loading="lazy"
                      className="w-100"
                    />
                  </figure>
                  <div className="card-content">
                    <div className="card-title-wrapper">
                      <h3 className="h3 card-title">
                        <a href="#">{car.name}</a>
                      </h3>
                      <data className="year" value={car.year}>
                        {car.year}
                      </data>
                    </div>
                    <ul className="card-list">
                      <li className="card-list-item">
                        <FaUsers className="icon" />
                        <span className="card-item-text">{car.seats} People</span>
                      </li>
                      <li className="card-list-item">
                        <FaBolt className="icon" />
                        <span className="card-item-text">Tolls - {car.toll_n_taxes}</span>
                      </li>
                      <li className="card-list-item">
                        <FaTachometerAlt className="icon" />
                        <span className="card-item-text">₹{car.price_per_km}/km</span>
                      </li>
                      <li className="card-list-item">
                        <FaMicrochip className="icon" />
                        <span className="card-item-text">{car.transmission}</span>
                      </li>
                    </ul>
                    <div className="card-price-wrapper">
                      <p className="card-price">
                        <strong>₹{distanceCharge.toFixed(2)}</strong>
                      </p>
                      <button
                        className="btn"
                        onClick={() => {
                          setSelectedCar(car);
                          setModalOpen(true);
                        }}
                      >
                        Book now
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {selectedCar && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          car={selectedCar}
          totalDistance={distance ?? 0} // Ensure distance is a number
          distanceCharge={(distance ?? 0) * selectedCar.price_per_km}
          phoneNumber={phoneNumber}
          customerId={
            sessionStorage.getItem("customerId")
              ? parseInt(sessionStorage.getItem("customerId")!, 10)
              : null // Parse customerId to number
          }
        />
      )}
    </section>
  );
}
