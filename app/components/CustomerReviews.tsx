"use client";

import { FaQuoteLeft } from "react-icons/fa"; // Import icons from React Icons

// Define Review Interface
interface Review {
  id: number;
  name: string;
  image_url: string;
  feedback: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Amit Sharma",
    image_url: "/assets/reviews/1.JPG",
    feedback:
      "Tej Travels made my trip seamless and comfortable. The car was clean, and the driver was very polite. Highly recommend their services!",
  },
  {
    id: 2,
    name: "Priya Singh",
    image_url: "/assets/reviews/6.JPG",
    feedback:
      "I had an amazing experience with Tej Travels. Booking was easy, and their support team was very helpful. Great service!",
  },
  {
    id: 3,
    name: "Rahul Verma",
    image_url: "/assets/reviews/4.JPG",
    feedback:
      "Affordable prices and excellent service! I will definitely choose Tej Travels for my future trips. Thank you!",
  },
];

export default function CustomerReviews() {
  return (
    <section className="section customer-reviews" id="customer-reviews" style={{ marginTop: -50 }}>
      <div className="container">
        <div className="title-wrapper">
          <h2 className="h2 section-title">What Our Customers Say</h2>
        </div>
        <ul className="reviews-list">
          {reviews.map((review) => (
            <li key={review.id} className="review-card">
              <div className="review-content">
                <figure className="reviewer-image">
                  <img
                    src={review.image_url}
                    alt={review.name}
                    loading="lazy"
                    className="rounded-full w-20 h-20 object-cover border border-gray-300"
                  />
                </figure>
                <blockquote className="review-text">
                  <FaQuoteLeft className="quote-icon text-gray-500" />
                  <p>{review.feedback}</p>
                </blockquote>
                <div className="reviewer-name">
                  <strong>{review.name}</strong>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <style jsx>{`
        .customer-reviews {
          background-color: #f9f9f9;
          padding: 50px 0;
        }
        .section-title {
          text-align: center;
          margin-bottom: 30px;
          font-size: 2rem;
          font-weight: bold;
        }
        .reviews-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          padding: 0;
          list-style: none;
        }
        .review-card {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          padding: 20px;
          text-align: center;
        }
        .reviewer-image {
          margin-bottom: 15px;
        }
        .quote-icon {
          margin-bottom: 10px;
        }
        .review-text {
          font-size: 1rem;
          line-height: 1.5;
          color: #555;
          margin-bottom: 15px;
        }
        .reviewer-name {
          font-size: 1.1rem;
          font-weight: bold;
          color: #333;
        }
      `}</style>
    </section>
  );
}
