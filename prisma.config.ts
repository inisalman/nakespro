import { loadEnvFile } from "node:process";
import { defineConfig, env } from "prisma/config";

try {
  loadEnvFile();
} catch {
  // Environment variables are provided by the deployment runtime in production.
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
