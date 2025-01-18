import { serve } from "@hono/node-server";
import { Hono } from "hono";

export const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/numbers/:startNumber/:endNumber", async (c) => {
  const startNumber = parseInt(c.req.param("startNumber"));
  const endNumber = parseInt(c.req.param("endNumber"));

  if (isNaN(startNumber) || isNaN(endNumber)) {
    return c.json({ error: "startNumber or endNumber is missing" }, 400);
  }

  if (endNumber <= startNumber) {
    return c.json({ error: "endNumber must be greater than startNumber" }, 400);
  }

  if (endNumber - startNumber > 10000) {
    return c.json({ error: "Range cannot exceed 10,000" }, 400);
  }

  const numbers = Array.from(
    { length: endNumber - startNumber + 1 },
    (_, i) => startNumber + i
  );

  return c.json(numbers);
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

export const server = serve({
  fetch: app.fetch,
  port,
});
