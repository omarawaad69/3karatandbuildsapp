import { json } from '@sveltejs/kit';

export async function POST({ request, platform, locals }) {
  if (!locals.user) return json({ error: 'الرجاء تسجيل الدخول' }, { status: 401 });
  const db = platform.env.DB;
  const { property_id } = await request.json();
  const fav = await db.prepare("SELECT * FROM favorites WHERE user_id = ? AND property_id = ?").bind(locals.user.id, property_id).first();
  if (fav) {
    await db.prepare("DELETE FROM favorites WHERE user_id = ? AND property_id = ?").bind(locals.user.id, property_id).run();
    return json({ action: 'removed' });
  } else {
    await db.prepare("INSERT INTO favorites (user_id, property_id) VALUES (?, ?)").bind(locals.user.id, property_id).run();
    return json({ action: 'added' });
  }
}

export async function GET({ platform, locals }) {
  if (!locals.user) return json([]);
  const db = platform.env.DB;
  const favs = await db.prepare("SELECT p.* FROM favorites f JOIN properties p ON f.property_id = p.id WHERE f.user_id = ?").bind(locals.user.id).all();
  return json(favs.results);
}