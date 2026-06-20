import { redirect } from '@sveltejs/kit';

export function load({ locals }) {
  if (!locals.user || locals.user.role !== 'admin') throw redirect(302, '/login');
  return { user: locals.user };
}