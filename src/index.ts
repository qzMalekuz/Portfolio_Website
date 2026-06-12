import { serve } from "bun";
import index from "./index.html";

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

    // Serve index.html for all unmatched routes so client-side routes
    // (e.g. /chatlo, /playto-pay) resolve. Media/PDF assets are bundled by
    // Bun and served as hashed root-level URLs, so no extension routes are
    // needed here — and a glob like "/*.mp4" would greedily swallow client
    // paths and 404 them. This catch-all must be last.
    "/": index,
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
