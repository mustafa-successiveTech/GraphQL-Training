import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    default: "NO message from user",
  },
});

export const Message = mongoose.model('Message', messageSchema);