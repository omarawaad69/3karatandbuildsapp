import { json } from '@sveltejs/kit';
import crypto from 'crypto';

export async function POST({ request, platform, locals }) {
  if (!locals.user || locals.user.role !== 'admin') return json({ error: 'Forbidden' }, { status: 403 });
  const db = platform.env.DB;
  const { request_id, finalPrice } = await request.json();
  const pr = await db.prepare("SELECT * FROM purchase_requests WHERE id = ? AND status = 'pending'").bind(request_id).first();
  if (!pr) return json({ error: 'طلب غير صالح' }, { status: 400 });
  const property = await db.prepare("SELECT * FROM properties WHERE id = ?").bind(pr.property_id).first();
  const settings = await db.prepare("SELECT commission_percent FROM settings LIMIT 1").first();
  const percent = settings.commission_percent;
  const commission = (finalPrice * percent) / 100;
  const tId = crypto.randomUUID();

  await db.batch([
    db.prepare("UPDATE properties SET status = 'sold' WHERE id = ?").bind(property.id),
    db.prepare("UPDATE purchase_requests SET status = 'approved' WHERE id = ?").bind(request_id),
    db.prepare("INSERT INTO transactions (id, property_id, seller_id, buyer_id, final_price, commission_percent, commission_amount) VALUES (?, ?, ?, ?, ?, ?, ?)").bind(tId, property.id, property.seller_id, pr.buyer_id, finalPrice, percent, commission)
  ]);
  return json({ success: true, commission });
}