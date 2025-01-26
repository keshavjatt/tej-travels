"use client";

import { useRouter } from "next/navigation";
import {
  IoPeopleOutline,
  IoSparklesOutline,
  IoHappyOutline,
  IoTrailSignOutline,
  IoArrowForwardOutline,
} from "react-icons/io5"; // Importing necessary icons from react-icons

// Utility function to get a random emoji
const getRandomEmoji = () => {
  const emojis = ["🗓️", "🌟", "📅", "🎉", "✨", "📌", "🏷️", "🎈", "🌍", "🏖️", "🏞️", "🏰"];
  return emojis[Math.floor(Math.random() * emojis.length)];
};

export default function FeaturedPlaces() {
  const router = useRouter();

  const places = [
    {
      id: 1,
      name: 'Delhi Tourism',
      year: getRandomEmoji(),
      seats: 2,
      fuel: 'Historic Heritage',
      mileage: 'Explore Old Delhi Streets',
      transmission: 'Cultural Ride',
      priceDescription: `${getRandomEmoji()} Capital Adventures`,
      image: '/assets/images/delhi tourism.png',
    },
    {
      id: 2,
      name: 'Agra (Taj Mahal)',
      year: getRandomEmoji(),
      seats: 2,
      fuel: 'Love & Beauty',
      mileage: 'Witness the Monument of Love',
      transmission: 'Romantic Journey',
      priceDescription: `${getRandomEmoji()} Timeless Love`,
      image: '/assets/images/agra tourism.png',
    },
    {
      id: 3,
      name: 'Vrindavan (Mathura)',
      year: getRandomEmoji(),
      seats: 4,
      fuel: 'Spiritual Bliss',
      mileage: 'Divine Krishna Tales',
      transmission: 'Religious Journey',
      priceDescription: `${getRandomEmoji()} Land of Krishna`,
      image: '/assets/images/mathura vrindavan.png',
    },
    {
      id: 4,
      name: 'Jaipur (Pink City)',
      year: getRandomEmoji(),
      seats: 3,
      fuel: 'Royal Glory',
      mileage: 'Explore Palaces and Forts',
      transmission: 'Regal Vibes',
      priceDescription: `${getRandomEmoji()} Royal Heritage`,
      image: '/assets/images/jaipur rajasthan.png',
    },
    {
      id: 5,
      name: 'Rishikesh Haridwar',
      year: getRandomEmoji(),
      seats: 2,
      fuel: 'Holy Energy',
      mileage: 'Feel the Ganga’s Purity',
      transmission: 'Adventurous Spirituality',
      priceDescription: `${getRandomEmoji()} Gateway to Moksha`,
      image: '/assets/images/Haridwar-to-rishikesh.jpg',
    },
    {
      id: 6,
      name: 'Manali (Himachal Pradesh)',
      year: getRandomEmoji(),
      seats: 1,
      fuel: 'Snowy Escape',
      mileage: 'Breathe in Fresh Mountain Air',
      transmission: 'Serene Getaway',
      priceDescription: `${getRandomEmoji()} Nature’s Paradise`,
      image: '/assets/images/manali himachal.jpg',
    },
    {
      id: 7,
      name: 'Uttarakhand (Nainital, Lansdowne, Ranikhet)',
      year: getRandomEmoji(),
      seats: 4,
      fuel: 'Nature’s Delight',
      mileage: 'Witness Scenic Hills',
      transmission: 'Tranquil Escape',
      priceDescription: `${getRandomEmoji()} Hill Retreat`,
      image: '/assets/images/Uttarakhand-Tourism.png',
    },
    {
      id: 8,
      name: 'Tirth Yatra (Chaardham)',
      year: getRandomEmoji(),
      seats: 2,
      fuel: 'Divine Inspiration',
      mileage: 'Spiritual Awakening',
      transmission: 'Holy Expedition',
      priceDescription: `${getRandomEmoji()} Spiritual Bliss`,
      image: '/assets/images/Chardham-Yatra-Package-2023.jpeg',
    },
    {
      id: 9,
      name: 'Prayagraj, Ayodhya, Varanasi',
      year: getRandomEmoji(),
      seats: 3,
      fuel: 'Religious Harmony',
      mileage: 'Experience Holy Ghats',
      transmission: 'Peaceful Pilgrimage',
      priceDescription: `${getRandomEmoji()} Sacred Journeys`,
      image: '/assets/images/Prayagraj,Ayodhya,Varanasi.jpg',
    },
    {
      id: 10,
      name: 'Jammu and Kashmir',
      year: getRandomEmoji(),
      seats: 3,
      fuel: 'Heavenly Charm',
      mileage: 'Embrace the Natural Beauty',
      transmission: 'Mesmerizing Views',
      priceDescription: `${getRandomEmoji()} Paradise on Earth`,
      image: '/assets/images/jammu kashmir.png',
    },
  ];  

  return (
    <section className="section featured-car" id="featured-car">
      <div className="container">
        <div className="title-wrapper">
          <h2 className="h2 section-title">Popular Places to Visit</h2>
          <a href="#home" className="featured-car-link">
            <span>View more</span>
            <IoArrowForwardOutline style={{ fontSize: "1.2rem", color: "gray" }} />
          </a>
        </div>
        <ul className="featured-car-list">
          {places.map((place) => (
            <li key={place.id}>
              <div className="featured-car-card">
                <figure className="card-banner">
                  <img src={place.image} alt={`${place.name}`} loading="lazy" className="w-100" />
                </figure>
                <div className="card-content">
                  <div className="card-title-wrapper">
                    <h3 className="h3 card-title">
                      <a href="#">{place.name}</a>
                    </h3>
                    <data className="year" value={place.year}>
                      {place.year}
                    </data>
                  </div>
                  <ul className="card-list">
                    <li className="card-list-item">
                      <IoPeopleOutline style={{ fontSize: "1.2rem", color: "gray" }} />
                      <span className="card-item-text">{place.seats} People</span>
                    </li>
                    <li className="card-list-item">
                      <IoSparklesOutline style={{ fontSize: "1.2rem", color: "gray" }} />
                      <span className="card-item-text">{place.fuel}</span>
                    </li>
                    <li className="card-list-item">
                      <IoHappyOutline style={{ fontSize: "1.2rem", color: "gray" }} />
                      <span className="card-item-text">{place.mileage}</span>
                    </li>
                    <li className="card-list-item">
                      <IoTrailSignOutline style={{ fontSize: "1.2rem", color: "gray" }} />
                      <span className="card-item-text">{place.transmission}</span>
                    </li>
                  </ul>
                  <div className="card-price-wrapper">
                    <p className="card-price">
                      <small>{place.priceDescription}</small>
                    </p>
                    <button className="btn" onClick={() => router.push("#home")}>
                      Book now
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
