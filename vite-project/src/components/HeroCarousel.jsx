import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function HeroCarousel() {
  const items = [
    { id: 1, title: 'Carousel Image 1', coverImage: '/img/main-carousel/carousel1.png' },
    { id: 2, title: 'Carousel Image 2', coverImage: '/img/main-carousel/carousel2.png' },
    { id: 3, title: 'Carousel Image 3', coverImage: '/img/main-carousel/carousel3.png' }
  ];

  const [index, setIndex] = useState(0);
  const [cooldown, setCooldown] = useState(false);



  useEffect(() => {
    if (cooldown) return; // pause

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % items.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [cooldown, items.length]);



  const triggerCooldown = () => {
    setCooldown(true);
    setTimeout(() => setCooldown(false), 5000); // 5 sec

  };

  const prev = () => {
    triggerCooldown();
    setIndex((current) => (current - 1 + items.length) % items.length);
};

  const next = () => {
    triggerCooldown();
    setIndex((current) => (current + 1) % items.length);
  };



  return (
    <section className="hero-carousel" aria-label="Featured posts carousel">
      <button className="carousel-arrow carousel-arrow--left" onClick={prev} aria-label="Previous slide" type="button"><ChevronLeft size={22} />
      </button>

      <div className="hero-carousel__viewport">
        <div className="hero-carousel__track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {items.map((slide) => (
            <article className="hero-carousel__slide" key={slide.id}>
              <img className="hero-carousel__image" src={slide.coverImage} alt={slide.title} />
            </article>
          ))
        }

        </div>
      </div>


      <button className="carousel-arrow carousel-arrow--right" onClick={next} aria-label="Next slide" type="button"><ChevronRight size={22} />
      </button></section>
  );
}

//    const styles = {
//  carousel: {
//    width: "300px",
//    height: "180px",
//    overflow:

