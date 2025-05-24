import { SampleQuery } from '../types';

export const sampleQueries: SampleQuery[] = [
  {
    id: 'blog-posts',
    name: 'Get All Blog Posts',
    schema: 'blog',
    query: `
query GetAllPosts {
  posts {
    id
    title
    content
    author {
      name
      email
    }
    comments {
      content
      author
    }
    createdAt
    tags
  }
}
    `.trim(),
  },
  {
    id: 'blog-author',
    name: 'Get Author with Posts',
    schema: 'blog',
    query: `
query GetAuthorWithPosts {
  author(id: "1") {
    id
    name
    email
    bio
    posts {
      id
      title
      content
      comments {
        content
        author
      }
    }
  }
}
    `.trim(),
  },
  {
    id: 'ecommerce-products',
    name: 'Get Products by Category',
    schema: 'ecommerce',
    query: `
query GetProductsByCategory {
  products(category: "1") {
    id
    name
    description
    price
    inventory
    category {
      name
    }
    reviews {
      rating
      comment
      user {
        name
      }
    }
  }
}
    `.trim(),
  },
  {
    id: 'ecommerce-order',
    name: 'Get Order Details',
    schema: 'ecommerce',
    query: `
query GetOrderDetails {
  order(id: "1") {
    id
    user {
      name
      email
    }
    items {
      product {
        name
        price
      }
      quantity
      price
    }
    total
    status
    createdAt
  }
}
    `.trim(),
  },
  {
    id: 'social-feed',
    name: 'Get User Feed',
    schema: 'social',
    query: `
query GetUserFeed {
  feed(userId: "1") {
    id
    content
    author {
      username
      name
      avatar
    }
    likes
    comments {
      content
      author {
        username
      }
      likes
    }
    media {
      url
      type
    }
    createdAt
  }
}
    `.trim(),
  },
  {
    id: 'social-user',
    name: 'Get User Profile',
    schema: 'social',
    query: `
query GetUserProfile {
  user(id: "1") {
    id
    username
    name
    bio
    avatar
    followers {
      id
      username
    }
    following {
      id
      username
    }
    posts {
      id
      content
      likes
      createdAt
    }
  }
}
    `.trim(),
  },
];