import { error } from '@sveltejs/kit';

export async function load({ params, platform, locals }) {
  const db = platform.env.DB;
  const property = await db.prepare("SELECT * FROM properties WHERE id = ?").bind(params.id).first();
  if (!property) throw error(404, 'العقار غير موجود');

  let isFav = false;
  if (locals.user) {
    const fav = await db.prepare("SELECT * FROM favorites WHERE user_id = ? AND property_id = ?").bind(locals.user.id, params.id).first();
    isFav = !!fav;
  }

  return {
    property,
    isFav,
    user: locals.user || null
  };
}