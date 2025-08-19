import {
  userQueryResolvers,
  userResolvers,
  postQueryResolvers,
  postResolvers,
  commentQueryResolvers,
  commentResolvers,
} from "../BlogApp/query.js";

import {
  commentMutationResolvers,
  postMutationResolvers,
  userMutationResolvers,
} from "../BlogApp/mutation.js";

export const userModule = {
  Query: userQueryResolvers,
  Mutation: userMutationResolvers,
  User: userResolvers.User,
};

export const postModule = {
  Query: postQueryResolvers,
  Mutation: postMutationResolvers,
  Post: postResolvers.Post,
};

export const commentModule = {
  Query: commentQueryResolvers,
  Mutation: commentMutationResolvers,
  Comment: commentResolvers.Comment,
};
