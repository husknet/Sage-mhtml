export default async (request) => {
  const slug = new URL(request.url).pathname.replace(/^\/go\//, "");
  const DESTS = {
    "open-file": "https://sgkfles.first-omega.info/689c772a6693bdab519ba432",
  };
  const dest = DESTS[slug];
  if (!dest) return new Response("Not found", { status: 404 });
  return Response.redirect(dest, 302);
};
