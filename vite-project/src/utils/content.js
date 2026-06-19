export function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('da-DK', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);

}


export function toSlug(text = '') {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
} //got help from copilot



export function normalizeGraphQLPost(post) {
  return {
    id: post.id ?? post.slug ?? post.title,

    title: post.title ?? 'Untitled post',
    slug: post.slug,


    body: post.content?.html || '',
    rawContent: post.content?.raw || null,
    markdown: post.content?.markdown || null,

    content: post.text || '',

    //date
    publishedAt: post.published || '',


    author: {
      name: post.author || 'Unknown',
    },

    category: {
      name: post.category || 'Uncategorized',
      slug: toSlug(post.category || 'Uncategorized'),
    },


    coverImage:
      post.image?.url ||
      '/img/main-carousel/carousel1.png',
  };

}


export function buildCategories(posts = []) {
  const map = new Map();

  posts.forEach((post) => {
    const category = post.category?.slug ?? 'uncategorized';
    const title = post.category?.name ?? 'Uncategorized';

    if (!map.has(category)) {
      map.set(category, { name: title, slug: category, posts: [] });
    }


    map.get(category).posts.push({ id: post.id, title: post.title, slug: post.slug });
  });

  return [...map.values()].sort((a, b) => a.name.localeCompare(b.name));

}


export function stripHtml(html) {
  if (typeof html !== 'string') return '';
  return html.replace(/<[^>]*>/g, ' ');
}

export function bodyToBlocks(body) {
  if (!body) return [];

  if (Array.isArray(body)) {
    return body.flatMap((item) => {
      if (typeof item === 'string') return [{ type: 'p', text: item }];
      if (item?.type === 'list' && Array.isArray(item.items)) return [{ type: 'list', items: item.items }];
      if (item?.html) return [{ type: 'p', text: stripHtml(item.html) }];
      if (item?.text) return [{ type: 'p', text: item.text }];
      return []; //help from copilot
    });
  }

  if (typeof body === 'string') {
    const text = stripHtml(body);
    return text
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => ({ type: 'p', text: p }));

  }


  return [];
}
