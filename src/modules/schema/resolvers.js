import { authModule, commentModule, messageHistoryModule, postModule, userModule, userPresenceModule, verifySubscription } from "../BlogApp/index.js";
import { messageMutation } from "../BlogApp/mutation.js";
import { messageSubscription, userPresenceSubscription } from "../BlogApp/subscription.js";
import { UnionResolvers } from "../BlogApp/unionResolver.js";

export const resolvers = {
  Query: {
    ...userModule.Query,
    ...postModule.Query,
    ...commentModule.Query,
    ...authModule.Query,
    ...messageHistoryModule.Query
  },
  Mutation: {
    ...verifySubscription.Mutation,
    ...commentModule.Mutation,
    ...authModule.Mutation,
    ...userPresenceModule.Mutation
  },
  Subscription: {
    ...verifySubscription.Subscription,
    ...userPresenceSubscription.Subscription
  },
  User: {
    ...userModule.User,
  },
  Post: {
    ...postModule.Post,
  },
  Comment: {
    ...commentModule.Comment,
  },
  ...UnionResolvers
};
