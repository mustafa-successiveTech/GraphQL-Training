import { pubsub } from "../../server/pubsub.js";
import { comments, messages, posts, users } from "./datasource.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { subscribe } from "graphql";
import { authCheck } from "../utils/authUtils.js";
import { User } from "../schema/userSchema.js";
import { roleCheck } from "../utils/roleUtils.js";
import { Message } from "../schema/messageSchema.js";

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
    const ExistUser = await User.findOne({ email });
    if (ExistUser) throw new Error("User already exists");

    const hashedPassword = await bcrypt.hash(password, 10);
    const NewUser = {
      id: users.length + 1,
      name,
      email,
      password: hashedPassword,
    };
    const user = await User.create(NewUser);
    console.log("User", user);
    return { ...user };
  },

  login: async (_, { email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found");
    if (!user.password) throw new Error("User has no password");
    console.log("Userc:", user);
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid password");
    const token = jwt.sign({ user }, "SECRET_KEY", { expiresIn: "1h" });
    console.log("Token", token);
    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      password: user.password, 
      posts: [], 
      comments: [],
      token,
      isOnline: "true",
    };
  },

  sendMessage: async (_, { content, senderId }, context) => {
    authCheck(context);
    const sender = User.findById({senderId});
    if (!sender) throw new Error("Sender not found");

    roleCheck(context);

    const message = {
      id: messages.length + 1,
      content,
      sender,
      createdAt: new Date().toISOString(),
    };
    const msg = await Message.create({content});
    return message;
  },
};

export const userPresenceMutation = {
  setUserPresence: (_, { userId, isOnline }, { users }) => {
    const user = users.find((u) => u.id === userId);
    if (!user) throw new Error("User not found");

    user.isOnline = isOnline;

    const payload = {
      userId: user.id,
      name: user.name,
      isOnline: user.isOnline,
    };

    pubsub.publish(PRESENCE_CHANGED, { presenceChanged: payload });
    return payload;
  },
};
