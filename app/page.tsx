import Navbar from './components/Navbar';
import Hero from './components/Hero';
import FeaturedCars from './components/FeaturedCars';
import GetStarted from './components/GetStarted';
import Blog from './components/Blog';
import Footer from './components/Footer';
import CustomerReviews from './components/CustomerReviews';
import ActivitiesWidget from './components/ActivityWidget';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <FeaturedCars />
        <GetStarted />
        <CustomerReviews />
        <ActivitiesWidget />
        <Blog />
      </main>
      <Footer />
    </>
  );
}
