import { userQueryResolvers, userResolvers } from "../assignment1/query.js";
import { postQueryResolvers, postResolvers } from "../assignment1/query.js";
import {
  commentQueryResolvers,
  commentResolvers,
} from "../assignment1/query.js";

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
