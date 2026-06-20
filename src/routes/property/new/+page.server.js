import { fail, redirect } from '@sveltejs/kit';
import crypto from 'crypto';

export const actions = {
  default: async ({ request, platform, locals }) => {
    if (!locals.user) throw redirect(302, '/login');
    const db = platform.env.DB;
    const data = await request.formData();
    const id = crypto.randomUUID();
    const images = '[]'; // يمكنك إضافة حقل للصور لاحقاً
    try {
      await db.prepare(`
        INSERT INTO properties (id, seller_id, type, title, description, price, area, bedrooms, bathrooms, floor, location, images)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(
        id, locals.user.id,
        data.get('type'), data.get('title'), data.get('description'),
        parseFloat(data.get('price')), parseFloat(data.get('area')) || null,
        parseInt(data.get('bedrooms')) || null, parseInt(data.get('bathrooms')) || null,
        parseInt(data.get('floor')) || null, data.get('location'), images
      ).run();
    } catch (e) {
      return fail(500, { error: 'خطأ في الحفظ' });
    }
    throw redirect(302, `/property/${id}`);
  }
};