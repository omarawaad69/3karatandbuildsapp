import { json } from '@sveltejs/kit';
import crypto from 'crypto';

export async function POST({ request, platform, locals }) {
  if (!locals.user) return json({ error: 'يجب تسجيل الدخول' }, { status: 401 });
  const db = platform.env.DB;
  const { property_id } = await request.json();
  const id = crypto.randomUUID();
  await db.prepare("INSERT INTO purchase_requests (id, property_id, buyer_id) VALUES (?, ?, ?)").bind(id, property_id, locals.user.id).run();
  return json({ success: true });
}