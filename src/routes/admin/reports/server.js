export async function PUT({ request, platform }) {
  const db = platform.env.DB;
  const { id, status } = await request.json();
  await db.prepare("UPDATE reports SET status = ? WHERE id = ?").bind(status, id).run();
  return new Response(JSON.stringify({ success: true }));
}