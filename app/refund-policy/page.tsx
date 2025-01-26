'use client';

import Navbar from '../components/Navbar'; // Adjust the path for your Navbar component
import Footer from '../components/Footer'; // Adjust the path for your Footer component

export default function RefundPolicyPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 mt-20">
        <div className="max-w-4xl mx-auto overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Refund Policy</h1>
            <p className="text-gray-700 leading-relaxed mb-4">
              At <strong>Tej Travels</strong>, we strive to provide the best travel experience for our customers. We understand that plans can change, and we are here to assist you with cancellations and refunds whenever possible.
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Cancellation and Refund Eligibility</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Refunds are applicable for cancellations made within the following conditions:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
              <li>
                Cancellations made more than <strong>24 hours</strong> before the scheduled pick-up time are eligible for a full refund.
              </li>
              <li>
                Cancellations made between <strong>12 to 24 hours</strong> before the scheduled pick-up time are eligible for a 50% refund.
              </li>
              <li>
                Cancellations made less than <strong>12 hours</strong> before the scheduled pick-up time are not eligible for a refund.
              </li>
            </ul>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Refund Process</h2>
            <ol className="list-decimal list-inside text-gray-700 leading-relaxed mb-4">
              <li>
                To request a refund, please contact our customer support team at{' '}
                <a href="mailto:support@tejtravels.in" className="text-indigo-600 hover:underline">
                  support@tejtravels.in
                </a>{' '}
                with your booking details.
              </li>
              <li>
                Once your cancellation request is approved, the refund will be processed within <strong>7-10 business days</strong>.
              </li>
              <li>
                Refunds will be credited to the original payment method used at the time of booking.
              </li>
            </ol>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Exceptions</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Refunds are not applicable under the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
              <li>Missed pick-ups due to customer delays or no-shows.</li>
              <li>Last-minute changes to the booking that do not comply with our cancellation policy.</li>
              <li>Non-refundable promotional bookings or offers.</li>
            </ul>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed">
              If you have any questions or concerns regarding our refund policy, please feel free to contact us:
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
