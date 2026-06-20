<script> export let data; </script>
<h1>المعاملات المكتملة</h1>
<table><tr><th>العقار</th><th>البائع</th><th>المشتري</th><th>السعر</th><th>العمولة</th><th>التاريخ</th></tr>
{#each data.transactions as t}
  <tr><td>{t.property_title}</td><td>{t.seller_username}</td><td>{t.buyer_username}</td><td>{t.final_price}</td><td>{t.commission_amount}</td><td>{t.completed_at}</td></tr>
{/each}</table>