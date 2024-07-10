Bun.serve({
  fetch() {
    return new Response("Hello, World!")
  },
});

console.log("Server started");