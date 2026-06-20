export async function load({ platform }) {
  const db = platform.env.DB;
  const reports = await db.prepare(`
    SELECT r.*, p.title as property_title, u.username as reporter
    FROM reports r
    JOIN properties p ON r.property_id = p.id
    JOIN users u ON r.reporter_id = u.id
    ORDER BY r.created_at DESC
  `).all();
  return { reports: reports.results };
}