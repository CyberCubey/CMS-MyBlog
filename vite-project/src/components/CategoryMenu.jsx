import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function CategoryMenu({ categories = [] }) {
  const [open, setOpen] = useState(false);


  function toggleMenu() {
    setOpen(!open);
  }

  function closeMenu() {
    setOpen(false);
  }



  return (
    <div className={`category-menu ${open ? 'is-open' : ''}`}>

    <button type="button" className="nav-link nav-link--dropdown" onClick={toggleMenu}>
      CATEGORIES <ChevronDown size={14} />
      </button>

  <div className="category-menu__panel">
    {categories.length > 0 ? (categories.map((category) => {
    
    return (   
      <div className="category-menu__group" key={category.slug}>
        <div className="category-menu__label">{category.name}

        </div>
          <div className="category-menu__links">
                  {category.posts.slice(0, 8).map((post) => {
                    return (
                      <Link
                        key={post.slug}
                        to={`/blog/${post.slug}`}
                        className="category-menu__link"
                        onClick={closeMenu} > {post.title}
                        </Link>
                      );
            })} </div>
              </div>
            );

    
})
) : (
<div className="category-menu__empty">No categories yet.</div> )}
    </div>
  </div> );
  
}




