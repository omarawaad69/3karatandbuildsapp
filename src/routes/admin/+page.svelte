<script> export let data; </script>
<h1>نظرة عامة</h1>
<ul>
  <li>المستخدمين: {data.users}</li>
  <li>العقارات: {data.properties}</li>
  <li>المبيعات: {data.transactions}</li>
  <li>العمولات: {data.totalCommission} جنيه</li>
  <li>بلاغات مفتوحة: {data.openReports}</li>
</ul>