'use client';

import Navbar from '../components/Navbar'; // Adjust the path for your Navbar component
import Footer from '../components/Footer'; // Adjust the path for your Footer component

export default function TermsAndConditionsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 mt-20">
        <div className="max-w-4xl mx-auto overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Terms and Conditions</h1>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to <strong>Tej Travels</strong>. By accessing or using our services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Booking and Payment</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
              <li>All bookings are subject to availability and confirmation.</li>
              <li>Payment must be completed at the time of booking to secure your reservation.</li>
              <li>Any additional charges or tolls during the trip are the responsibility of the customer.</li>
            </ul>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Cancellation Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Cancellation requests must comply with our <a href="/refund-policy" className="text-indigo-600 hover:underline">Refund Policy</a>. Please review the policy for more details.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Customer Responsibilities</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
              <li>Customers must ensure accurate details are provided during booking.</li>
              <li>It is the customer’s responsibility to arrive on time at the designated pick-up location.</li>
              <li>Any misconduct or violation of laws during the trip will result in termination of service without a refund.</li>
            </ul>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Service Limitations</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
              <li>Tej Travels reserves the right to refuse service to any customer.</li>
              <li>Our services may be affected by unforeseen circumstances, such as weather, traffic, or technical issues.</li>
            </ul>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Liability Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Tej Travels is not liable for any loss, damage, or inconvenience caused during the use of our services. Customers are advised to ensure their belongings and personal safety.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We respect your privacy. Please refer to our <a href="/privacy-policy" className="text-indigo-600 hover:underline">Privacy Policy</a> to understand how we collect, use, and protect your information.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Changes to Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Tej Travels reserves the right to modify these terms at any time. Changes will be effective immediately upon posting on our website.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about these terms, please contact us:
              <br />
              <strong>Email:</strong> support@tejtravels.in
              <br />
              <strong>Phone:</strong> +91 83681 54854
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
