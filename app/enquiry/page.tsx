"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AvailableCars from "../components/AvailableCars";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { differenceInDays } from "date-fns";
import axios from "axios";
import {
  FaLocationArrow,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaCarSide,
} from "react-icons/fa";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoicmFodWxzYWhuaTE2OSIsImEiOiJjbHprM3I0bHMwbmIzMmtyMHQ0d3Q2aDF1In0.rNhynN4QO1to7V1A94vT0Q";

function EnquiryContent() {
  const searchParams = useSearchParams();

  // Extract trip details from query parameters
  const pickup = searchParams.get("pickup");
  const destination = searchParams.get("destination");
  const tripStartDate = searchParams.get("tripStartDate");
  const tripStartTime = searchParams.get("tripStartTime");
  const tripEndDate = searchParams.get("tripEndDate");
  const phoneNumber = searchParams.get("phoneNumber");
  const id = searchParams.get("id");

  useEffect(() => {
    if (id) {
      sessionStorage.setItem("customerId", id);
    }
  }, [id]);

  // State for distance
  const [distance, setDistance] = useState<number | null>(null);

  // Calculate the number of days between start and end dates
  const numDays =
    tripStartDate && tripEndDate
      ? differenceInDays(new Date(tripEndDate), new Date(tripStartDate)) + 1
      : 0;

  // Fetch distance using Mapbox Directions API
  useEffect(() => {
    const fetchDistance = async () => {
      if (!pickup || !destination) return;

      try {
        const pickupResponse = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            pickup
          )}.json`,
          {
            params: { access_token: MAPBOX_TOKEN },
          }
        );

        const destinationResponse = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            destination
          )}.json`,
          {
            params: { access_token: MAPBOX_TOKEN },
          }
        );

        const pickupCoordinates = pickupResponse.data.features[0].center;
        const destinationCoordinates =
          destinationResponse.data.features[0].center;

        const directionsResponse = await axios.get(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates.join(
            ","
          )};${destinationCoordinates.join(",")}.json`,
          {
            params: { access_token: MAPBOX_TOKEN },
          }
        );

        const distanceInKm =
          directionsResponse.data.routes[0]?.distance / 1000 || 0;

        // Multiply by 2 for round trip
        setDistance(distanceInKm * 2);
      } catch (error) {
        console.error("Error fetching distance:", error);
        setDistance(null);
      }
    };

    fetchDistance();
  }, [pickup, destination]);

  return (
    <>
      <section className="section enquiry mt-10 sm:mt-6 mb-0">
        <div className="container">
          <div className="trip-details mb-6">
            <div className="round-trip-indicator flex items-center gap-2 mb-4">
              <span className="online-dot w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-green-500 font-bold text-lg sm:text-base border border-green-500 px-3 py-1 rounded-full">
                Round Trip
              </span>
            </div>

            <div
              className="trip-info flex gap-4 text-lg sm:text-base font-semibold flex-wrap"
              style={{
                border: "2px solid black",
                borderRadius: "8px",
                backgroundColor: "lightyellow",
                padding: "10px",
              }}
            >
              <p className="flex items-center gap-2">
                <FaLocationArrow className="text-blue-500" />
                Pickup City:{" "}
                <span className="text-blue-500 font-medium">{pickup}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-red-500" />
                Destination City:{" "}
                <span className="text-red-500 font-medium">{destination}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-green-500" />
                Trip Start: <span>{tripStartDate}</span> @{" "}
                <span>{tripStartTime}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaCalendarAlt className="text-purple-500" />
                Trip End: <span>{tripEndDate}</span>
              </p>
              <p className="flex items-center gap-2">
                <FaClock className="text-orange-500" />
                Duration: <span>{numDays} day(s)</span>
              </p>
              {distance !== null && (
                <p className="flex items-center gap-2">
                  <FaCarSide className="text-blue-500" />
                  Total Distance:{" "}
                  <span className="text-blue-500 font-medium">
                    {distance.toFixed(2)} km
                  </span>
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
      <AvailableCars distance={distance} phoneNumber={phoneNumber} />
    </>
  );
}

// Wrapping with Suspense for useSearchParams
export default function EnquiryPage() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <EnquiryContent />
      </Suspense>
      <Footer />
    </>
  );
}
