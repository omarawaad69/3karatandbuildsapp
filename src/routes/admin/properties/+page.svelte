<script>
  export let data;
  async function changeStatus(id, status) {
    await fetch(`/api/admin/properties`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status })
    });
    location.reload();
  }
</script>
<h1>العقارات</h1>
<table><tr><th>العنوان</th><th>السعر</th><th>الحالة</th><th>تغيير</th></tr>
{#each data.properties as p}
  <tr>
    <td>{p.title}</td><td>{p.price}</td><td>{p.status}</td>
    <td>
      {#if p.status !== 'sold'}<button on:click={() => changeStatus(p.id, 'sold')}>تم البيع</button>{/if}
    </td>
  </tr>
{/each}</table>