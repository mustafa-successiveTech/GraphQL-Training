import express from "express";
import http from "http";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import cors from "cors";
import { makeExecutableSchema } from "@graphql-tools/schema";

import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";

import { pubsub } from "./pubsub.js"; // Import the pubsub instance

import { typeDefs } from "../modules/schema/typeDefs.js";
import { resolvers } from "../modules/schema/resolvers.js";
import jwt from 'jsonwebtoken';

export async function createExpressServer() {
  const app = express();
  const httpServer = http.createServer(app);

  // Build executable schema
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Apollo Server setup
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  await server.start();

  // Attach HTTP middleware
  app.use(
    "/graphql",
    express.json(),
    expressMiddleware(server, {
      context: ({ req }) => {
        const authHeader = req.headers.authorization || "";
        if (!authHeader) console.log("NO authHeader");
        console.log("AUth header :", authHeader);
        const token = authHeader.split(" ")[1];
        console.log("Token:" , token);

        if (!token) {
          console.log("No authHeader");
          return { pubsub };
        }

        try {
          console.log("Before decode :");
          const decoded = jwt.verify(token, "SECRET_KEY"); // decoded.user will have full user info
          console.log("Verified", decoded);
          return { pubsub, user: decoded.user };
        } catch (err) {
          console.log("JWT verify fail :", err.name, err.message);
           // user not included
        }
      },
    })
  );

  // WebSocket server for subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  useServer(
    {
      schema,
      context: async () => ({ pubsub }), // 👈 inject pubsub in WS context
    },
    wsServer
  );

  return httpServer;
}

export const createApolloServer = createExpressServer;
