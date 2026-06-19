import { Link, NavLink } from 'react-router-dom';
import CategoryMenu from './CategoryMenu';

import SearchModal from './SearchModal';


export default function Header({ categories = [], posts = [] }) {
  return (
    <header className="site-header">
      <div className="site-header__inner">

        <Link to="/" className="site-brand" aria-label="Home">
          <img src="/logo.png" alt="myblog" className="site-brand__logo"/>
        </Link>

        <nav className="site-nav" aria-label="Main navigation">
          <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'is-active' : ''}`}>HOME</NavLink>
          
          <CategoryMenu categories={categories} />
          <a href="#about" className="nav-link">ABOUT</a>
          <a href="#contact" className="nav-link">CONTACT</a>
        </nav>


        <SearchModal posts={posts} />
      </div>
    </header>
  );
}
