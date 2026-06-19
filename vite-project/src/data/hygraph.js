import { buildCategories, normalizeGraphQLPost } from '../utils/content';
const ENDPOINT = import.meta.env.VITE_HYGRAPH_ENDPOINT || 'https://eu-west-2.cdn.hygraph.com/content/cmq83t54y006v08uzq884jhxc/master';


async function request(query, variables = {}) {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({ query, variables }),
  });



  const json = await response.json();

  if (!response.ok || json.errors) {
    const message =
      json.errors?.map((e) => e.message).join(', ') ||
      `Request failed with status ${response.status}`;
    throw new Error(message); }

  return json.data;
}


export async function fetchSiteData() {
  try { //GraphQL ⬇️⬇️
    const query = `
      query SiteData {
      posts(orderBy: published_DESC) {
    id
    title
    slug
    content {
      html
      markdown
      raw
    }
    text
    image {
      url
      fileName
      mimeType
    }
    published
    author
    category
    }
      }
    `;

    const data = await request(query);
      const posts = (data?.posts ?? []).map(normalizeGraphQLPost);
      const categories = buildCategories(posts);

    return {
      posts,
      categories,
      source: 'hygraph',
    };

  } catch (error) {
  console.error('Hygraph fetch failed:', error);
  return {
    posts: [],
    categories: [],
    source: 'hygraph-error',
  };
}

}

export async function fetchPostBySlug(slug) {
  try {
    const query = `
      query PostBySlug($slug: String!) {
      post(where: { slug: $slug }) {
    id
    title
    slug
    content {
      html
      markdown
      raw
    }
    text
    image {
      url
      fileName
      mimeType
    }
    published
    author
    category
  }
  }

      }
    `;

  const data = await request(query, { slug });

    if (!data?.post) return null;
    return normalizeGraphQLPost(data.post);
  } catch (error) {
    console.error('Failed to fetch post by slug,', error);
  }}

