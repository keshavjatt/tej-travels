"use client"
import { useState, useEffect } from 'react';
import styles from './ActivitiesWidget.module.css';

const ActivitiesWidget = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activities = [
    {
      img: '/assets/reviews/1.JPG',
      title: 'Jaipur, Rajasthan, India',
      description: "Tej Travels made our Jaipur trip seamless! The driver was polite and knowledgeable, and the car was clean and comfortable.",
    },
    {
      img: '/assets/reviews/2.JPG',
      title: 'Rajasthan, India',
      description: "Their cab service in rural areas was reliable and efficient. Highly recommended for offbeat travel plans!",
    },
    {
      img: '/assets/reviews/3.JPG',
      title: 'Kerala, India',
      description: "the journey was smooth and relaxing. The cab was comfortable, the driver was professional, and the itinerary was perfectly planned. Highly recommended for anyone visiting Kerala!",
    },
    {
      img: '/assets/reviews/4.JPG',
      title: 'Manali, Himachal Pradesh, India',
      description: 'Exceptional service during our Manali trip! The driver was very friendly and always on time.',
    },
    {
      img: '/assets/reviews/5.JPG',
      title: 'Kufri, Himachal Pradesh, India',
      description: 'Amazing experience with Tej Travels in Kufri. Safe driving on hilly roads and the cab was very comfortable.',
    },
    {
      img: '/assets/reviews/6.JPG',
      title: 'Taj Mahal, Agra, India',
      description: 'Tej Travels made our Taj Mahal visit stress-free. The cab arrived promptly, and the driver was very courteous.',
    },
  ];

  // Automatically loop through activities every 3 seconds (or change as needed)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % activities.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [activities.length]);

  return (
    <div className={styles.widget}>
      <div className={styles.activityWrapper}>
        {activities.map((activity, index) => (
          <div
            key={index}
            className={`${styles.activity} ${index === activeIndex ? styles.active : ''}`}
          >
            <div className={styles.img}>
              <img src={activity.img} alt={activity.title} />
            </div>
            <div className={styles.text}>
              <h3>{activity.title}</h3>
              <p>{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.controls}>
        <button onClick={() => setActiveIndex((prev) => (prev - 1 + activities.length) % activities.length)}>&#x2B05;</button>
        <span>{activeIndex + 1}/{activities.length}</span>
        <button onClick={() => setActiveIndex((prev) => (prev + 1) % activities.length)}>&#x27A1;</button>
      </div>
    </div>
  );
};

export default ActivitiesWidget;
