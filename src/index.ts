import { serve, file } from "bun";
import index from "./index.html";
import path from "path";

const server = serve({
  port: 3001,
  routes: {
    "/api/hello": {
      async GET(req) {
        return Response.json({ message: "Hello, world!", method: "GET" });
      },
      async PUT(req) {
        return Response.json({ message: "Hello, world!", method: "PUT" });
      },
    },

    "/api/hello/:name": async (req) => {
      const name = req.params.name;
      return Response.json({ message: `Hello, ${name}!` });
    },

    "/*.mp4": async (req) => {
      const url = new URL(req.url);
      const filename = url.pathname.slice(1); // remove leading /
      const filePath = path.join(import.meta.dir, "assets", filename);
      const f = file(filePath);
      if (await f.exists()) {
        return new Response(f, {
          headers: { "Content-Type": "video/mp4" },
        });
      }
      return new Response("Not found", { status: 404 });
    },

    // Serve index.html for all unmatched routes.
    // This must be last as it is a catch-all.
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
