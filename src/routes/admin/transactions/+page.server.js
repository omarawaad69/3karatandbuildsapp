export async function load({ platform }) {
  const db = platform.env.DB;
  const transactions = await db.prepare(`
    SELECT t.*, p.title as property_title, s.username as seller_username, b.username as buyer_username
    FROM transactions t
    JOIN properties p ON t.property_id = p.id
    JOIN users s ON t.seller_id = s.id
    JOIN users b ON t.buyer_id = b.id
  `).all();
  return { transactions: transactions.results };
}