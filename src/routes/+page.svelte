<script>
  export let data;
  $: properties = data.properties;
</script>

<h1>🏘️ سوق العقارات</h1>
<div class="grid">
  {#each properties as p}
    <div class="card">
      <h3><a href="/property/{p.id}">{p.title || 'عقار'}</a></h3>
      <p>النوع: {p.type}</p>
      <p>السعر: {p.price} جنيه</p>
      <p>{p.location}</p>
    </div>
  {/each}
</div>

<style>
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin-top:1rem; }
  .card { background: white; border-radius: 8px; padding: 1rem; box-shadow: 0 1px 4px rgba(0,0,0,0.1); }
  a { color: #2c3e50; text-decoration: none; }
</style>