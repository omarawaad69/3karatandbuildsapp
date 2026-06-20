import { json } from '@sveltejs/kit';
import crypto from 'crypto';

export async function GET({ platform, url }) {
  const db = platform.env.DB;
  let query = "SELECT * FROM properties WHERE status='available'";
  const type = url.searchParams.get('type');
  if (type) query += " AND type = ?";
  query += " ORDER BY created_at DESC LIMIT 50";
  const stmt = db.prepare(query);
  const result = type ? await stmt.bind(type).all() : await stmt.all();
  return json(result.results);
}

export async function POST({ request, platform, locals }) {
  if (!locals.user) return json({ error: 'غير مصرح' }, { status: 401 });
  const db = platform.env.DB;
  const data = await request.json();
  const id = crypto.randomUUID();
  await db.prepare(`
    INSERT INTO properties (id, seller_id, type, title, description, price, area, bedrooms, bathrooms, floor, location, images)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(id, locals.user.id, data.type, data.title, data.description, data.price, data.area, data.bedrooms, data.bathrooms, data.floor, data.location, JSON.stringify(data.images || [])).run();
  return json({ id });
}