import { json } from '@sveltejs/kit';

export async function GET({ platform, locals }) {
  if (!locals.user) return json([]);
  const db = platform.env.DB;
  const convs = await db.prepare(`
    SELECT u.id, u.username,
      (SELECT content FROM messages WHERE (sender_id = ? AND receiver_id = u.id) OR (sender_id = u.id AND receiver_id = ?) ORDER BY created_at DESC LIMIT 1) as last_msg,
      (SELECT created_at FROM messages WHERE (sender_id = ? AND receiver_id = u.id) OR (sender_id = u.id AND receiver_id = ?) ORDER BY created_at DESC LIMIT 1) as last_time
    FROM users u
    WHERE u.id IN (
      SELECT DISTINCT CASE WHEN sender_id = ? THEN receiver_id ELSE sender_id END
      FROM messages
      WHERE sender_id = ? OR receiver_id = ?
    )
  `).bind(locals.user.id, locals.user.id, locals.user.id, locals.user.id, locals.user.id, locals.user.id, locals.user.id).all();
  return json(convs.results);
}