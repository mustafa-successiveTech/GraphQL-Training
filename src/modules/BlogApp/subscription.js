import { subscribe } from "graphql";
import { pubsub } from "../../server/pubsub.js";
import { withFilter } from "graphql-subscriptions";

export const messageSubscription = {
  messageAdded: {
    subscribe: () => pubsub.asyncIterableIterator(["MESSAGE_ADDED"]),
  }
};

export const commentSubscriptionResolvers = {
  commentAdded: {
    subscribe: withFilter(
      () => pubsub.asyncIterableIterator(["COMMENT_ADDED"]),  // ✅ correct
      (payload, variables) => {
        return payload.commentAdded.postId === variables.postId;
      }
    ),
  },
};

export const userPresenceSubscription = {
  presenceChanged: {
    subscribe: () => pubsub.asyncIterableIterator([PRESENCE_CHANGED])
  }
};