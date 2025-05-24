import { Schema } from '../types';

export const sampleSchemas: Schema[] = [
  {
    id: 'blog',
    name: 'Blog Schema',
    schema: `
      type Post {
        id: ID!
        title: String!
        content: String!
        author: Author!
        comments: [Comment!]!
        createdAt: String!
        tags: [String!]
      }

      type Author {
        id: ID!
        name: String!
        email: String!
        posts: [Post!]!
        bio: String
      }

      type Comment {
        id: ID!
        content: String!
        author: String!
        createdAt: String!
      }

      type Query {
        posts: [Post!]!
        post(id: ID!): Post
        authors: [Author!]!
        author(id: ID!): Author
      }

      type Mutation {
        createPost(title: String!, content: String!, authorId: ID!): Post!
        updatePost(id: ID!, title: String, content: String): Post!
        deletePost(id: ID!): Boolean!
        createComment(postId: ID!, content: String!, author: String!): Comment!
      }
    `,
  },
  {
    id: 'ecommerce',
    name: 'E-Commerce Schema',
    schema: `
      type Product {
        id: ID!
        name: String!
        description: String
        price: Float!
        category: Category!
        inventory: Int!
        images: [String!]
        reviews: [Review!]
      }

      type Category {
        id: ID!
        name: String!
        products: [Product!]!
      }

      type Review {
        id: ID!
        rating: Int!
        comment: String
        user: User!
        createdAt: String!
      }

      type User {
        id: ID!
        name: String!
        email: String!
        orders: [Order!]
      }

      type Order {
        id: ID!
        user: User!
        items: [OrderItem!]!
        total: Float!
        status: OrderStatus!
        createdAt: String!
      }

      type OrderItem {
        id: ID!
        product: Product!
        quantity: Int!
        price: Float!
      }

      enum OrderStatus {
        PENDING
        PROCESSING
        SHIPPED
        DELIVERED
        CANCELED
      }

      type Query {
        products(category: ID): [Product!]!
        product(id: ID!): Product
        categories: [Category!]!
        orders(userId: ID!): [Order!]!
        order(id: ID!): Order
      }

      type Mutation {
        createProduct(name: String!, description: String, price: Float!, categoryId: ID!, inventory: Int!): Product!
        updateProduct(id: ID!, name: String, description: String, price: Float, inventory: Int): Product!
        deleteProduct(id: ID!): Boolean!
        createOrder(userId: ID!, items: [OrderItemInput!]!): Order!
        updateOrderStatus(id: ID!, status: OrderStatus!): Order!
      }

      input OrderItemInput {
        productId: ID!
        quantity: Int!
      }
    `,
  },
  {
    id: 'social',
    name: 'Social Media Schema',
    schema: `
      type User {
        id: ID!
        username: String!
        name: String!
        email: String!
        bio: String
        avatar: String
        followers: [User!]!
        following: [User!]!
        posts: [Post!]!
        createdAt: String!
      }

      type Post {
        id: ID!
        content: String!
        author: User!
        likes: Int!
        comments: [Comment!]!
        media: [Media!]
        createdAt: String!
      }

      type Comment {
        id: ID!
        content: String!
        author: User!
        createdAt: String!
        likes: Int!
      }

      type Media {
        id: ID!
        url: String!
        type: MediaType!
      }

      enum MediaType {
        IMAGE
        VIDEO
        GIF
      }

      type Query {
        users: [User!]!
        user(id: ID!): User
        posts: [Post!]!
        post(id: ID!): Post
        feed(userId: ID!): [Post!]!
      }

      type Mutation {
        createUser(username: String!, name: String!, email: String!, bio: String, avatar: String): User!
        followUser(userId: ID!, targetId: ID!): Boolean!
        unfollowUser(userId: ID!, targetId: ID!): Boolean!
        createPost(userId: ID!, content: String!, media: [MediaInput!]): Post!
        likePost(userId: ID!, postId: ID!): Post!
        createComment(userId: ID!, postId: ID!, content: String!): Comment!
      }

      input MediaInput {
        url: String!
        type: MediaType!
      }
    `,
  }
];