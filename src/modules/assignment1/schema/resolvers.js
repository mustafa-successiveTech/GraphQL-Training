import { userQueryResolvers, userResolvers } from "./../query.js";
import { postQueryResolvers, postResolvers } from "./../query.js";
import { commentQueryResolvers, commentResolvers } from "./../query.js";

export const userModule = {
  Query: userQueryResolvers,
  User: userResolvers.User,
};

export const postModule = {
  Query: postQueryResolvers,
  Post: postResolvers.Post,
};

export const commentModule = {
  Query: commentQueryResolvers,
  Comment: commentResolvers.Comment,
};
