import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';

import PostCard from './PostCard';

export default function
PostCarousel({ posts = [], title = 'Latest posts' }) {

  const scrollerRef = useRef(null);



const move = (direction) => {
  const node = scrollerRef.current;
  if (!node) return;
  const amount = Math.max(280, node.clientWidth * 0.9);
  node.scrollBy({ left: direction * amount, behavior: 'smooth' });
  
};

  return (
    <section className="post-carousel">
    <div className="section-heading">
      <h2>{title}</h2>
        
        <div className="section-heading__controls">
          <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Scroll left">


            <ChevronLeft size={18} />
          </button>

          <button type="button" onClick={() => move(1)} aria-label="Scroll right">
            <ChevronRight size={18} />
          </button>

        </div></div>

      <div className="post-carousel__scroller" ref={scrollerRef}>
        {posts.slice(0, 8).map((post) => (

          <div className="post-carousel__item" key={post.id}>
            <PostCard post={post} />
          </div>

        )

      )}
      </div>
    
  </section>
  );
}
