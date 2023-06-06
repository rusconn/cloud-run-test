console.log("cold start?");

const fastify = require("fastify")({
  logger: true,
});

fastify.get("/", (_request, reply) => {
  reply.send("hello");
});

fastify.listen(
  { port: Number(process.env.PORT), host: "0.0.0.0" },
  (err, address) => {
    console.log(`listening on ${address}`);
    if (err) throw err;
  }
);
