<script>
  export let data;
</script>

<h1>لوحة التحكم</h1>
<h2>عقاراتي</h2>
{#each data.properties as p}
  <div class="card">
    <a href="/property/{p.id}">{p.title}</a> - {p.status}
    {#if p.status === 'sold'}
      <span>(تم البيع)</span>
    {/if}
  </div>
{/each}

<h2>طلبات الشراء الواردة</h2>
{#each data.requests as r}
  <div class="card">
    عقار: {r.property_title} | من: {r.buyer_username} | الحالة: {r.status}
  </div>
{/each}