import { json } from '@sveltejs/kit';
import crypto from 'crypto';

export async function GET({ params, platform, locals }) {
  if (!locals.user) return json([]);
  const db = platform.env.DB;
  const msgs = await db.prepare(`
    SELECT * FROM messages 
    WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) 
    ORDER BY created_at ASC
  `).bind(locals.user.id, params.userId, params.userId, locals.user.id).all();
  return json(msgs.results);
}

export async function POST({ params, request, platform, locals }) {
  if (!locals.user) return json({ error: 'تسجيل الدخول مطلوب' }, { status: 401 });
  const db = platform.env.DB;
  const { content, property_id } = await request.json();
  const id = crypto.randomUUID();
  await db.prepare("INSERT INTO messages (id, sender_id, receiver_id, property_id, content) VALUES (?, ?, ?, ?, ?)").bind(id, locals.user.id, params.userId, property_id || null, content).run();
  return json({ success: true });
}