export async function load({ platform }) {
  const db = platform.env.DB;
  const users = await db.prepare("SELECT COUNT(*) as count FROM users").first();
  const properties = await db.prepare("SELECT COUNT(*) as count FROM properties").first();
  const transactions = await db.prepare("SELECT COUNT(*) as count, SUM(commission_amount) as total_comm FROM transactions").first();
  const openReports = await db.prepare("SELECT COUNT(*) as count FROM reports WHERE status='open'").first();
  return {
    users: users.count,
    properties: properties.count,
    transactions: transactions.count,
    totalCommission: transactions.total_comm || 0,
    openReports: openReports.count
  };
}