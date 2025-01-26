'use client';

import Navbar from '../components/Navbar'; // Adjust the path for your Navbar component
import Footer from '../components/Footer'; // Adjust the path for your Footer component

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 mt-20">
        <div className="max-w-4xl mx-auto overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Privacy Policy</h1>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to Tej Travels. Your privacy is critically important to us. This Privacy Policy outlines how we collect,
              use, and protect your information.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              - Personal information such as name, email, and phone number when you create an account or book a service.
              <br />- Payment information for booking confirmation.
              <br />- Browsing data and cookies for improving user experience.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              - To process bookings and payments.
              <br />- To improve our services and provide personalized recommendations.
              <br />- To send updates, offers, and notifications regarding your account or bookings.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Sharing Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell, rent, or share your personal information with third parties except to provide our services
              or comply with legal obligations.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Rights</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have the right to:
              <br />- Access, update, or delete your personal information.
              <br />- Opt out of receiving promotional emails.
              <br />- Contact us with any privacy-related concerns.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Cookies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website uses cookies to improve functionality and enhance your experience. You can choose to disable
              cookies in your browser settings, though it may affect the usability of certain features.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may update our Privacy Policy from time to time. Any changes will be reflected on this page. We encourage
              you to review this page periodically.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
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
