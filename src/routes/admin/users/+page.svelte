<script> export let data; </script>
<h1>المستخدمين</h1>
<table border="1"><tr><th>المستخدم</th><th>الدور</th><th>تاريخ التسجيل</th></tr>
{#each data.users as u}
  <tr><td>{u.username}</td><td>{u.role}</td><td>{u.created_at}</td></tr>
{/each}</table>