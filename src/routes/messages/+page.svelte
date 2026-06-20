<script>
  export let data;
</script>

<h1>الرسائل</h1>
{#each data.conversations as c}
  <div class="conv">
    <a href="/messages/{c.id}">{c.username}</a>
    <p>{c.last_msg} - {new Date(c.last_time).toLocaleString()}</p>
  </div>
{/each}