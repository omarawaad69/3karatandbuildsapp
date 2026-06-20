<script>
  export let data;
  async function resolve(id) {
    await fetch('/api/admin/reports', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: 'resolved' })
    });
    location.reload();
  }
</script>
<h1>البلاغات</h1>
<table><tr><th>العقار</th><th>المُبلِغ</th><th>السبب</th><th>الحالة</th><th>إجراء</th></tr>
{#each data.reports as r}
  <tr><td>{r.property_title}</td><td>{r.reporter}</td><td>{r.reason}</td><td>{r.status}</td>
    <td>{#if r.status === 'open'}<button on:click={() => resolve(r.id)}>حل</button>{/if}</td>
  </tr>
{/each}</table>