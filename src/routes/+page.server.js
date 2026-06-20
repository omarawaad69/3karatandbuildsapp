export async function load({ platform }) {
  const db = platform.env.DB;
  const properties = await db.prepare("SELECT * FROM properties WHERE status='available' ORDER BY created_at DESC LIMIT 20").all();
  return { properties: properties.results };
}