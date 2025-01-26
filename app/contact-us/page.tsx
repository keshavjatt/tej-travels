'use client';

import Navbar from '../components/Navbar'; // Adjust the path for Navbar
import Footer from '../components/Footer'; // Adjust the path for Footer

export default function ContactUsPage() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 mt-20">
        <div className="max-w-4xl mx-auto overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
            <p className="text-gray-700 leading-relaxed mb-6">
              We are here to assist you with any queries or concerns. Feel free to reach out to us through the following methods:
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Get in Touch</h2>
            <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-6">
              <li>
                <strong>Email:</strong> <a href="mailto:support@tejtravels.in" className="text-indigo-600 hover:underline">support@tejtravels.in</a>
              </li>
              <li>
                <strong>Phone:</strong> <a href="tel:+918368154854" className="text-indigo-600 hover:underline">+91 83681 54854</a>
              </li>
              <li>
                <strong>Address:</strong>  E-304, F/F, J J Colony, Near Mandrasi Mandir, Inderpuri, New Delhi, 110012
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Operating Hours</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Monday to Sunday: 9:00 AM - 10:00 PM
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Send Us a Message</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
