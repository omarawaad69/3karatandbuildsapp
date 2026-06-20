import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { createToken } from '$lib/auth';

export const actions = {
  default: async ({ request, platform, cookies }) => {
    const db = platform.env.DB;
    const data = await request.formData();
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');

    if (!username || !password) return fail(400, { error: 'الاسم وكلمة المرور مطلوبان' });
    const exists = await db.prepare("SELECT id FROM users WHERE username = ?").bind(username).first();
    if (exists) return fail(409, { error: 'اسم المستخدم موجود مسبقاً' });

    const id = crypto.randomUUID();
    const hash = bcrypt.hashSync(password, 10);
    await db.prepare("INSERT INTO users (id, username, email, password_hash) VALUES (?, ?, ?, ?)").bind(id, username, email, hash).run();

    const user = { id, username, role: 'user' };
    const token = await createToken(user);
    cookies.set('token', token, { path: '/', httpOnly: true, sameSite: 'strict', maxAge: 60*60*24*7 });
    throw redirect(302, '/');
  }
};