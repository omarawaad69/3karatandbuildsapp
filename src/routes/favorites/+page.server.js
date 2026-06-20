import { redirect } from '@sveltejs/kit';

export async function load({ platform, locals }) {
  if (!locals.user) throw redirect(302, '/login');
  const db = platform.env.DB;
  const favs = await db.prepare(`
    SELECT p.* FROM favorites f JOIN properties p ON f.property_id = p.id WHERE f.user_id = ?
  `).bind(locals.user.id).all();
  return { favorites: favs.results };
}