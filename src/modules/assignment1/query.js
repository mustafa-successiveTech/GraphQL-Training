import { comments, posts, users } from "./datasource.js";

export const userQueryResolvers = {
  getUser: (_, { id }) => {
    users.find(user => user.id === id);
  },
  getAllUsers: () => users,
};

export const userResolvers = {
  User: {
    posts: (parent) => posts.filter(post => post.authorId === parent.id),
    comments: (parent) => comments.filter(comment => comment.authorId === parent.id),
  }
};


export const postQueryResolvers = {
  getPost: (_, { id }) => posts.find(post => post.id === id),
  getAllPosts: () => posts,
};

export const postResolvers = {
  Post: {
    author: (parent) => users.find(user => user.id === parent.authorId),
    comments: (parent) => comments.filter(comment => comment.postId === parent.id),
  }
};

export const commentQueryResolvers = {
  getComment: (_, { id }) => comments.find(comment => comment.id === id),
  getAllComments: () => comments,
};

export const commentResolvers = {
  Comment: {
    author: (parent) => users.find(user => user.id === parent.authorId),
    post: (parent) => posts.find(post => post.id === parent.postId),
  }
};
