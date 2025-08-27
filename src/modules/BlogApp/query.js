import { comments, posts, users, messages } from "./datasource.js";

export const userQueryResolvers = {
  getUser: async (_, { id }) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const user = users.find((u) => u.id === id);
    if (!user) {
      return { message: "User not found", code: "USER_NOT_FOUND" };
    }
    return user;
  },
  getAllUsers: () => users,
};

export const userResolvers = {
  User: {
    posts: (parent) => posts.filter((post) => post.authorId === parent.id),
    comments: (parent) =>
      comments.filter((comment) => comment.authorId === parent.id),
  },
};

export const postQueryResolvers = {
  getPost: (_, { id }) => posts.find((post) => post.id === id),
  getAllPosts: () => posts,
  getPosts: (_, { page, limit, sortBy }) => {
    let sortedPosts = [...posts];
    if (sortBy === "date") {
      sortedPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    const start = (page - 1) * limit;
    const paginated = sortedPosts.slice(start, start + limit);
    return { posts: paginated, totalCount: posts.length };
  },
};

export const postResolvers = {
  Post: {
    author: (parent) => users.find((user) => user.id === parent.authorId),
    comments: (parent) =>
      comments.filter((comment) => comment.postId === parent.id),
  },
};

export const commentQueryResolvers = {
  getComment: (_, { id }) => comments.find((comment) => comment.id === id),
  getAllComments: () => comments,
};

export const authQuery = {
  users: () => users,
  messages: () => messages
};

export const messageHistoryResolvers = {
  messageHistory : (_, { limit, offset }, { messages}) => {

    const sortedMessages = [...messages].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );

    return sortedMessages.slice(offset, offset + limit);
  }
}

