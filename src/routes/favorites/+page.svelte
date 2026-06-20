<script>
  export let data;
</script>

<h1>المفضلة</h1>
{#each data.favorites as fav}
  <div class="card">
    <a href="/property/{fav.id}">{fav.title}</a> - {fav.price} جنيه
  </div>
{/each}