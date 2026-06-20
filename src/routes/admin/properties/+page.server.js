export async function load({ platform }) {
  const db = platform.env.DB;
  const props = await db.prepare("SELECT * FROM properties ORDER BY created_at DESC").all();
  return { properties: props.results };
}