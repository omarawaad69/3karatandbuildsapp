import { redirect } from '@sveltejs/kit';

export async function load({ platform, locals }) {
  if (!locals.user) throw redirect(302, '/login');
  const db = platform.env.DB;
  const properties = await db.prepare("SELECT * FROM properties WHERE seller_id = ? ORDER BY created_at DESC").bind(locals.user.id).all();
  const requests = await db.prepare(`
    SELECT pr.*, p.title as property_title, u.username as buyer_username
    FROM purchase_requests pr
    JOIN properties p ON pr.property_id = p.id
    JOIN users u ON pr.buyer_id = u.id
    WHERE p.seller_id = ?
  `).bind(locals.user.id).all();
  return { properties: properties.results, requests: requests.results };
}