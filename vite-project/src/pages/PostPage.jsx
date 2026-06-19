import { Link } from 'react-router-dom';
import { bodyToBlocks, formatDate } from '../utils/content';


export default function PostPage({ post }) {
  if (!post) {
    return (
      <main className="post-page">
      <div className="post-page__empty">
        <h1>Post not found</h1>
           <p>The article could not be loaded. </p>
          
          <Link to="/" className="button-link">Back to home</Link></div>
      </main>
    
    );}


  const blocks = bodyToBlocks(post.body);

  return (
    <main className="post-page">
      <section className="post-page__hero">
        <img
        src={post.coverImage}
        alt={post.title}
        className="post-page__heroImage" />
      </section>


      <section className="post-page__titleBox">
        <h1>{post.title}</h1>

      </section>
      <section className="post-page__meta">
        <span>D. {formatDate(post.publishedAt)}</span>
        <span>af {post.author?.name ?? 'myblog'}</span>
        <span>kategori: {post.category?.name ?? 'uncategorized'}</span>
      </section>

      <div className="post-page__rule" />



      <section className="post-page__content">
        {blocks.length ? (
          blocks.map((block, index) => {

            if (block.type === 'list') {
              return (
                <ol key={index}>
                  {block.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                  ))}
                </ol> // got help from copilot involving this
              );
            }
            return <p key={index}>{block.text}</p>;
          })
        ) : (
          <p>{post.excerpt}</p>
        )}



        <ol>
          <li>Nunc finibus gravida nunc vitae suscipit.</li>
          <li>Morbi tristique enim a diam rhoncus blandit. Ut porttitor arcu ut ante consectetur euismod.</li>
        </ol>
      </section>
    </main> //https://www.lipsum.com/feed/html
  );
}
