export default async (request) => {
  const slug = new URL(request.url).pathname.replace(/^\/go\//, "");
  const DESTS = {
    "open-file": "https://www.facebook.com/your-page-or-user/posts/1234567890",
  };
  const dest = DESTS[slug];
  if (!dest) return new Response("Not found", { status: 404 });
  return Response.redirect(dest, 302);
};
