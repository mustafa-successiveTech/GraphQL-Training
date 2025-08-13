import { commentModule, postModule, userModule } from "../schema/resolvers.js";

export const resolvers = {
  Query: {
    ...userModule.Query,
    ...postModule.Query,
    ...commentModule.Query,
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
};
