import HeroCarousel from '../components/HeroCarousel';
import PostCarousel from '../components/PostCarousel';

export default function HomePage({ posts = [] }){
  const heroSlides = [...posts].slice(0, 8).map((post, index) => ({
    ...post,
    coverImage: post.coverImage || `/img/main-carousel/carousel${(index % 3) + 1}.png`,
  })
);

  return (
    <main className="home-page">
      <section className="hero-wrap">
        <HeroCarousel slides={heroSlides} 
        />
      </section>



      <section className="intro-block">
        <div className="intro-block__line"/>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur velit sit amet maximus ultrices.
          Ut scelerisque interdum enim sed ultricies. Maecenas auctor porta scelerisque. Donec dictum purus a elit
          euismod volutpat.
        </p></section>

      <PostCarousel title="Latest posts" posts={posts} />


      <section className="home-grid"> {posts.slice(0, 8).map((post) => (
        <article className="home-grid__tile" key={post.id}>
          
        <img src={post.coverImage} alt={post.title} className="home-grid__image" />
          <div className="home-grid__content">
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            </div>
            
          </article>
        ))}
      </section>


      <div className="home-divider"/>
    </main>
  );
}

