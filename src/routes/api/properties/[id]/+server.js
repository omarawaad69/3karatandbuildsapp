import { json } from '@sveltejs/kit';

export async function GET({ params, platform }) {
  const db = platform.env.DB;
  const property = await db.prepare("SELECT * FROM properties WHERE id = ?").bind(params.id).first();
  return json(property);
}

export async function PUT({ params, request, platform, locals }) {
  if (!locals.user) return json({ error: 'مطلوب تسجيل الدخول' }, { status: 401 });
  const db = platform.env.DB;
  const prop = await db.prepare("SELECT * FROM properties WHERE id = ?").bind(params.id).first();
  if (!prop || prop.seller_id !== locals.user.id) return json({ error: 'غير مصرح' }, { status: 403 });
  const data = await request.json();
  await db.prepare(`
    UPDATE properties SET type=?, title=?, description=?, price=?, area=?, bedrooms=?, bathrooms=?, floor=?, location=?, images=?
    WHERE id=?
  `).bind(data.type, data.title, data.description, data.price, data.area, data.bedrooms, data.bathrooms, data.floor, data.location, JSON.stringify(data.images || []), params.id).run();
  return json({ success: true });
}

export async function DELETE({ params, platform, locals }) {
  if (!locals.user) return json({ error: 'مطلوب تسجيل الدخول' }, { status: 401 });
  const db = platform.env.DB;
  const prop = await db.prepare("SELECT * FROM properties WHERE id = ?").bind(params.id).first();
  if (!prop || prop.seller_id !== locals.user.id) return json({ error: 'غير مصرح' }, { status: 403 });
  await db.prepare("DELETE FROM properties WHERE id = ?").bind(params.id).run();
  return json({ success: true });
}