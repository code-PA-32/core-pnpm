import Fastify from "fastify"

const fastify = Fastify({
  logger: true,
})
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
