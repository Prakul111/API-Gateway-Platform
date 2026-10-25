import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import { prisma } from "database";

const app = Fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: { colorize: true },
    },
  },
});

// security plugins
await app.register(cors, { origin: true });
await app.register(helmet);
;

// health check points
app.get("/health", async () => {
  return { status: "ok", timeStamp: new Date().toString() };
});

app.get("/v1/users", async () => {
  const users = await prisma.user.findMany({
    include: { posts: true },
  });
  return { users };
});

const PORT = Number(process.env.PORT) || 4000;

const start = async () => {
  try {
    await app.listen({ port: PORT, host: "0.0.0.0" });
    app.log.info(`APIAPI gateway running on http://localhost:${PORT}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
