import { verifyToken } from '$lib/auth';

export async function handle({ event, resolve }) {
  const token = event.cookies.get('token');
  if (token) {
    const user = await verifyToken(token);
    if (user) event.locals.user = user;
  }
  return await resolve(event);
}