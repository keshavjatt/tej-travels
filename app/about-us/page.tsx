'use client';

import Navbar from '../components/Navbar'; // Adjust the path for your Navbar component
import Footer from '../components/Footer'; // Adjust the path for your Footer component

export default function AboutUsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 mt-20">
        <div className="max-w-4xl mx-auto overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">About Us</h1>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to <strong>Tej Travels</strong>, your trusted partner for hassle-free cab and taxi bookings. We are committed to providing reliable, affordable, and comfortable transportation services that cater to all your travel needs.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              At Tej Travels, our mission is to make every journey a memorable experience by offering top-notch travel solutions. Whether you are traveling for business, leisure, or adventure, we ensure your ride is safe, timely, and enjoyable.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
              <li>Fleet of well-maintained vehicles to suit every requirement.</li>
              <li>Professional and courteous drivers with extensive local knowledge.</li>
              <li>Transparent pricing with no hidden charges.</li>
              <li>24/7 customer support to assist you anytime, anywhere.</li>
            </ul>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Services</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We offer a variety of travel solutions, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
              <li>Local city rides for quick and convenient transport.</li>
              <li>Outstation trips to explore beautiful destinations with ease.</li>
              <li>Airport transfers to ensure timely pick-ups and drop-offs.</li>
              <li>Customized travel packages for special occasions and corporate events.</li>
            </ul>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              To redefine the travel experience by combining technology, reliability, and unmatched service quality, making Tej Travels a household name for cab and taxi bookings across the country.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              We would love to hear from you! Feel free to reach out for any inquiries, bookings, or feedback.
              <br />
              <strong>Email:</strong> support@tejtravels.in
              <br />
              <strong>Phone:</strong> +91 83681 54854
              <br />
              <strong>Office Address:</strong> E-304, F/F, J J Colony, Near Mandrasi Mandir, Inderpuri, New Delhi, 110012
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
