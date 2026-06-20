export async function load({ platform }) {
  const db = platform.env.DB;
  const users = await db.prepare("SELECT id, username, email, role, created_at FROM users").all();
  return { users: users.results };
}