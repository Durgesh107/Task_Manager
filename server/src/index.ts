import { buildSchema } from "type-graphql";
import "reflect-metadata";
import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import cors from "cors";
import { AppDataSource } from "./data-source";
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import { TaskResolver } from "./resolvers/TaskResolver";
import {AuthResolver} from "./resolvers/AuthResolver";
import {Context} from "./types/Context";


const bootstrap = async () => {
  await AppDataSource.initialize();
  console.log('database successfully connected');

  const schema = await buildSchema({
    resolvers: [TaskResolver,AuthResolver],
  });

  const app = express();

  app.use(cookieParser());

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

   app.use(
  '/graphql',
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }): Promise<Context> => {
      return { req, res }
    }
  })
);

  const PORT = process.env.PORT ? parseInt(process.env.PORT,10) : 4000;
  await new Promise<void>(resolve =>
    httpServer.listen({ port: PORT }, resolve)
  );

  console.log(`Server ready at http://localhost:${PORT}/graphql`);
};

bootstrap().catch(err => {
  console.error("Error starting server:", err);
});
