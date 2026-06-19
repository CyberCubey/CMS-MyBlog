import { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import { fetchPostBySlug, fetchSiteData } from './data/hygraph';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import PostPage from './pages/PostPage';



function PostRoute({ posts }) {
  const { slug } = useParams();
  const [post, setPost] = useState(posts.find((item) => item.slug === slug) ?? null);

  useEffect(() => {
    let active = true;
    async function load() {
      const found = posts.find((item) => item.slug === slug);
       
      if (found) {
        setPost(found);
        return;
      }
   
      const fetched = await fetchPostBySlug(slug);
      if (active) setPost(fetched);

  }
    load();
    return () => {
      active = false;
    };}, [posts, slug]);

  return <PostPage post={post} />;
}


export default function App() {
  const [state, setState] = useState({ posts: [], categories: [], source: 'loading' });
  const location = useLocation();


  useEffect(() => {
    let active = true;
    fetchSiteData().then((data) => {
      if (active) setState(data);
    } );

    return () => {
      active = false;
    };
  }, []);

  const featuredPosts = useMemo(() => state.posts.slice(0, 8), [state.posts]);

  useEffect(() => {
    document.title = location.pathname === '/' ? 'myblog.' : 'myblog. | Blog';
  }, [location.pathname]);


  return (
    <div className="app-shell">
      <Header categories={state.categories} posts={state.posts}/>
      <Routes>
        <Route path="/" element={<HomePage posts={featuredPosts} />} />
        <Route path="/blog/:slug" element={<PostRoute posts={state.posts} />}/>
        <Route path="*" element={<Navigate to="/" replace />}/>
      </Routes>

      <Footer/></div>
  );}


