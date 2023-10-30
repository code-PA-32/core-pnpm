import Fastify from "fastify"
import supertokens from "supertokens-node"
import Session from "supertokens-node/recipe/session"
import Passwordless from "supertokens-node/recipe/passwordless"
import formDataPlugin from "@fastify/formbody"
import cors from "@fastify/cors"
import { plugin, errorHandler } from "supertokens-node/framework/fastify"

const fastify = Fastify({
  logger: true,
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
fastify.get("/", function get(request, reply) {
  void reply.send({ hello: "world" })
})

fastify.addHook("preHandler", (request, reply, done) => {
  fastify.log.info(
    {
      req: request,
    },
    "request started",
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
    "request completed",
  )
  done()
})

void fastify
  .listen({ port: 4000 })
  .then(() => fastify.log.info("Server started on port 4000"))
  .catch((err) => {
    fastify.log.error(err)
    process.exit(1)
  })
