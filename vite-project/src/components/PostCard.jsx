
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/content';



export default function PostCard({ post })
{
  
  return (
    <article className="post-card">
     <Link className="post-card__imageWrap" to={`/blog/${post.slug}`}>

      <img className="post-card__image"
      src={post.coverImage}
      alt={post.title}
       />
      </Link>

      <div className="post-card__body">
      <h3 className="post-card__title">

        <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3><div className="post-card__meta">
          <span>{formatDate(post.publishedAt)}</span>
          
          <span>•</span>

          <span>af {post.author?.name ?? 'myblog'}</span>
        </div>
        


        <p className="post-card__excerpt">{post.excerpt}</p>
        
        <div className="post-card__footer">
          <span className="post-card__category">
            {post.category?.name ?? 'uncategorized'}
            </span>

          <Link className="post-card__link" to={`/blog/${post.slug}`}>Læs mere</Link>
        </div>



      </div></article>
  );
}

