import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { createToken } from '$lib/auth';

export const actions = {
  default: async ({ request, platform, cookies }) => {
    const db = platform.env.DB;
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');

    const user = await db.prepare("SELECT * FROM users WHERE username = ?").bind(username).first();
    if (!user || !bcrypt.compareSync(password, user.password_hash)) {
      return fail(401, { error: 'بيانات خاطئة' });
    }
    const token = await createToken(user);
    cookies.set('token', token, { path: '/', httpOnly: true, sameSite: 'strict', maxAge: 60*60*24*7 });
    throw redirect(302, '/');
  }
};