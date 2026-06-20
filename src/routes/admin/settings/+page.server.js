import { fail, redirect } from '@sveltejs/kit';

export async function load({ platform, locals }) {
  // الصفحة أصلًا محمية من +layout.server.js الخاص بالأدمن
  const db = platform.env.DB;
  const settings = await db.prepare("SELECT * FROM settings LIMIT 1").first();
  return { settings };
}

export const actions = {
  default: async ({ request, platform, locals }) => {
    if (!locals.user || locals.user.role !== 'admin') {
      throw redirect(302, '/login');
    }
    
    const db = platform.env.DB;
    const data = await request.formData();
    const site_name = data.get('site_name');
    const commission_percent = parseFloat(data.get('commission_percent'));

    if (!site_name || isNaN(commission_percent) || commission_percent < 0 || commission_percent > 100) {
      return fail(400, { error: 'قيم غير صالحة' });
    }

    try {
      await db.prepare("UPDATE settings SET site_name = ?, commission_percent = ? WHERE id = 1")
        .bind(site_name, commission_percent).run();
      return { success: true };
    } catch (e) {
      return fail(500, { error: 'فشل في الحفظ' });
    }
  }
};