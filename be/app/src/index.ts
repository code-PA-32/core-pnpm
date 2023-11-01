import type { FastifyReply, FastifyRequest } from "fastify"
import Fastify from "fastify"
import supertokens from "supertokens-node"
import Session from "supertokens-node/recipe/session"
import Passwordless from "supertokens-node/recipe/passwordless"
import formDataPlugin from "@fastify/formbody"
import cors from "@fastify/cors"
import { plugin, errorHandler } from "supertokens-node/framework/fastify"
import { createSchema, createYoga } from "graphql-yoga"

const fastify = Fastify({
  logger: true,
})

const yoga = createYoga<{
  req: FastifyRequest
  reply: FastifyReply
}>({
  // Integrate Fastify logger
  logging: {
    debug: (...args) => args.forEach((arg) => fastify.log.debug(arg)),
    info: (...args) => args.forEach((arg) => fastify.log.info(arg)),
    warn: (...args) => args.forEach((arg) => fastify.log.warn(arg)),
    error: (...args) => args.forEach((arg) => fastify.log.error(arg)),
  },
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      scalar File

      type Query {
        hello: String
        isFastify: Boolean
      }
      type Mutation {
        hello: String
        getFileName(file: File!): String
      }
    `,
    resolvers: {
      Query: {
        hello: () => "world",
      },
      Mutation: {
        hello: () => "world",
        getFileName: (root, { file }: { file: File }) => file.name,
      },
    },
  }),
})

supertokens.init({
  framework: "fastify",
  supertokens: {
    connectionURI: "http://localhost:3567",
    apiKey: "core-secret-key-supertokens",
  },
  appInfo: {
    appName: "core-be-app",
    apiDomain: "http://localhost:4000",
    websiteDomain: "http://localhost:3001",
    apiBasePath: "/auth",
    websiteBasePath: "/login",
  },
  recipeList: [
    Passwordless.init({
      flowType: "MAGIC_LINK",
      contactMethod: "EMAIL",
    }),
    Session.init(),
  ],
})

void fastify.register(cors, {
  origin: "http://localhost:3001",
  allowedHeaders: ["Content-Type", ...supertokens.getAllCORSHeaders()],
  credentials: true,
})
void fastify.register(formDataPlugin)
void fastify.register(plugin)
fastify.setErrorHandler(errorHandler())

fastify.route({
  // Bind to the Yoga's endpoint to avoid rendering on any path
  url: yoga.graphqlEndpoint,
  method: ["GET", "POST", "OPTIONS"],
  handler: async (req, reply) => {
    // Second parameter adds Fastify's `req` and `reply` to the GraphQL Context
    const response = await yoga.handleNodeRequest(req, {
      req,
      reply,
    })
    response.headers.forEach((value, key) => {
      void reply.header(key, value)
    })

    void reply.status(response.status)

    void reply.send(response.body)

    return reply
  },
})
fastify.get("/", function get(request, reply) {
  void reply.send({ hello: "world" })
})

fastify.addHook("preHandler", (request, reply, done) => {
  fastify.log.info(
    {
      req: request,
    },
    "Request started",
  )
  done()
})

fastify.addHook("onResponse", (request, reply, done) => {
  const responseTime = reply.getResponseTime()
  fastify.log.info(
    {
      response: {
        statusCode: reply.raw.statusCode,
      },
      responseTime,
    },
    "Request completed",
  )
  done()
})

void fastify
  .listen({ port: 4000 })
  .then(() => fastify.log.info("Server started on port 4000"))
  .catch((err) => {
    fastify.log.error(err)
  })
