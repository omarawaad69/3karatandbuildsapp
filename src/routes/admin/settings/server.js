import { json } from '@sveltejs/kit';

// GET - جلب الإعدادات
export async function GET({ platform, locals }) {
  if (!locals.user || locals.user.role !== 'admin') {
    return json({ error: 'غير مصرح' }, { status: 403 });
  }
  const db = platform.env.DB;
  const settings = await db.prepare("SELECT * FROM settings LIMIT 1").first();
  return json(settings);
}

// PUT - تحديث الإعدادات
export async function PUT({ request, platform, locals }) {
  if (!locals.user || locals.user.role !== 'admin') {
    return json({ error: 'غير مصرح' }, { status: 403 });
  }
  const db = platform.env.DB;
  const { site_name, commission_percent } = await request.json();
  if (!site_name || typeof commission_percent !== 'number') {
    return json({ error: 'بيانات غير صالحة' }, { status: 400 });
  }
  await db.prepare("UPDATE settings SET site_name = ?, commission_percent = ? WHERE id = 1")
    .bind(site_name, commission_percent).run();
  return json({ success: true });
}