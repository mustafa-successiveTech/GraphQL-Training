import { userQueryResolvers, userResolvers, postQueryResolvers, postResolvers, commentQueryResolvers, authQuery, messageHistoryResolvers } from "../BlogApp/query.js";

import { authMutation, commentMutationResolvers, messageMutation, postMutationResolvers, userMutationResolvers, userPresenceMutation } from "../BlogApp/mutation.js";
import { messageSubscription , commentSubscriptionResolvers, userPresenceSubscription} from "./subscription.js";

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
  Mutation: commentMutationResolvers
};

export const verifySubscription = {
  Mutation : {
    ...messageMutation,
  },
  Subscription : {
    // ...messageSubscription,
    ...commentSubscriptionResolvers
  }
};

export const authModule = {
  Query : {
    ...authQuery
  },
  Mutation : {
    ...authMutation
  }
};

export const userPresenceModule = {
  Mutation : {
    ...userPresenceMutation
  },
  Subscription : {
    ...userPresenceSubscription
  }
};

export const messageHistoryModule = {
  Query : {
    ...messageHistoryResolvers
  }
};