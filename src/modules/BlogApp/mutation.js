import { comments, posts, users } from "./datasource.js";

export const userMutationResolvers = {
  updateUser: (_, { id, email, name }) => {
    const user = users.find((u) => u.id === id);
    if (!user) throw new Error("User not found");
    if (name) user.name = name;
    if (email) user.email = email;
    return user;
  },
};

export const postMutationResolvers = {
  addPost: (_, { title, content, authorId }) => {
    const newPost = { id: String(posts.length + 1), title, content, authorId };
    posts.push(newPost);
    return newPost;
  },
};

export const commentMutationResolvers = {

  deleteComment: (_, { id }) => {
    const index = comments.findIndex((c) => c.id === id);
    if (index == -1) throw new Error("Comment not exist");
    return comments.splice(index, 1)[0];
  },

  addComment: (_, { text, authorId, postId }) => {
    const newComment = {
      id: String(comments.length + 1),
      text,
      authorId,
      postId,
    };
    
    comments.push(newComment);
    return newComment;
  },
};
