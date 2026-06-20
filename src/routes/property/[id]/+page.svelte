<script>
  export let data;
  $: property = data.property;
  $: user = data.user;
  let isFav = data.isFav;

  async function toggleFav() {
    await fetch('/api/favorites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ property_id: property.id })
    });
    isFav = !isFav;
  }

  async function report() {
    const reason = prompt('سبب الإبلاغ:');
    if (reason) {
      await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ property_id: property.id, reason })
      });
      alert('تم الإبلاغ');
    }
  }

  async function requestBuy() {
    await fetch('/api/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ property_id: property.id })
    });
    alert('تم إرسال طلب الشراء');
  }
</script>

<h1>{property.title}</h1>
<p>النوع: {property.type} | السعر: {property.price} جنيه</p>
<p>المساحة: {property.area || '-'} م² | غرف: {property.bedrooms || '-'} | حمامات: {property.bathrooms || '-'}</p>
<p>الموقع: {property.location}</p>
<p>{property.description}</p>

{#if user}
  <button on:click={toggleFav}>{isFav ? 'إزالة من المفضلة' : 'أضف للمفضلة'}</button>
  <button on:click={report}>إبلاغ</button>
  {#if user.id !== property.seller_id}
    <a href="/messages/{property.seller_id}?property={property.id}">📩 راسل البائع</a>
    <button on:click={requestBuy}>أريد الشراء</button>
  {/if}
  {#if user.id === property.seller_id}
    <a href="/property/edit/{property.id}">✏️ تعديل</a>
  {/if}
{/if}