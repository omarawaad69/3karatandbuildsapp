import { json } from '@sveltejs/kit';
import crypto from 'crypto';

export async function POST({ request, platform, locals }) {
  if (!locals.user) return json({ error: 'تسجيل الدخول مطلوب' }, { status: 401 });
  const db = platform.env.DB;
  const { property_id, reason } = await request.json();
  const id = crypto.randomUUID();
  await db.prepare("INSERT INTO reports (id, property_id, reporter_id, reason) VALUES (?, ?, ?, ?)").bind(id, property_id, locals.user.id, reason).run();
  return json({ success: true });
}