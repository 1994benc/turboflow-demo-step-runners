import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";
import { appendToText } from "./handlers/appendToText.ts";
import { lowercase } from "./handlers/lowercase.ts";
import { uppercase } from "./handlers/uppercase.ts";

const app = new Application();
app.use(
  oakCors({
    origin: ["http://localhost:3001", "https://turboflow.co"]
  }),
);
const router = new Router();

router.get("/", (ctx) => {
  ctx.response.body = { message: "API is working" };
  return ctx.response;
});

router.post("/api/uppercase", async ({ request, response }) => {
  return await uppercase(request, response);
});

router.post("/api/lowercase", async ({ request, response }) => {
  return await lowercase(request, response);
});

router.post("/api/append-to-text", async ({ request, response }) => {
  return await appendToText(request, response);
});

app.use(router.routes());
app.use(router.allowedMethods());
const PORT = Deno.env.get("PORT");
app.listen({
  port: PORT ? parseInt(PORT) : 9000,
});
