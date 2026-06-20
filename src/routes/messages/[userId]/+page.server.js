export async function load({ params, platform, locals }) {
  if (!locals.user) return { messages: [], otherUser: {}, currentUser: locals.user };
  const db = platform.env.DB;
  const other = await db.prepare("SELECT id, username FROM users WHERE id = ?").bind(params.userId).first();
  const messages = await db.prepare(`
    SELECT * FROM messages 
    WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) 
    ORDER BY created_at ASC
  `).bind(locals.user.id, params.userId, params.userId, locals.user.id).all();
  return { messages: messages.results, otherUser: other, currentUser: locals.user };
}