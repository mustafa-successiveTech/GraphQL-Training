import { pubsub } from "../../server/pubsub.js";
import { comments, messages, posts, users } from "./datasource.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { subscribe } from "graphql";

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
    console.log("New comment:", newComment);
    comments.push(newComment);

    // 🔹 Publish event
    pubsub.publish("COMMENT_ADDED", { commentAdded: newComment });

    return newComment;
  },
};

// Assignment -3

export const messageMutation = {
  messageAdded: async (_, { message }) => {
    // Publish event for subscribers
    await pubsub.publish("MESSAGE_ADDED", {
      messageAdded: message,
    });
    // MUST return something non-null (since schema says String!)
    return message;
  },
};

export const authMutation = {
  register: async (_, { name, email, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
    };
    users.push(user);
    const token = jwt.sign({ user }, "SECRET_KEY", { expiresIn: "1h"});
    console.log("User", user);
    return { ...user, token };
  },

  login: async (_, { email, password }) => {
    const user = users.find((u) => u.email === email);
    if (!user) throw new Error("User not found");
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid password");
    const token = jwt.sign({ user }, "SECRET_KEY", {expiresIn : "1h"});
    console.log("Token", token);
    return { ...user, token };
  },

  sendMessage: (_, { content, senderId }, { pubsub, user }) => {
    if (!user) throw new Error("Authentication required"); // ensures only logged-in users

    const sender = users.find((u) => u.id === parseInt(senderId));
    if (!sender) throw new Error("Sender not found");

    const message = {
      id: messages.length + 1,
      content,
      sender,
      createdAt: new Date().toISOString(),
    };
    messages.push(message);
    return message;
  },
};

export const userPresenceMutation = {
  setUserPresence: (_, { userId, isOnline }, { users }) => {
    const user = users.find(u => u.id === userId);
    if( !user ) throw new Error("User not found");

    user.isOnline = isOnline;

    const payload = {
      userId: user.id,
      name: user.name,
      isOnline: user.isOnline
    };

    pubsub.publish(PRESENCE_CHANGED, { presenceChanged: payload });
    return payload;
  },

};
