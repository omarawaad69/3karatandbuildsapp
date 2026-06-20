<script>
  import { enhance } from '$app/forms';
  export let form;
</script>

<h1>إضافة عقار جديد</h1>
<form method="POST" use:enhance>
  <label>العنوان: <input name="title" required /></label><br/>
  <label>النوع: <select name="type">
    <option>شقة</option><option>فيلا</option><option>أرض</option><option>مبنى</option>
  </select></label><br/>
  <label>السعر: <input name="price" type="number" required /></label><br/>
  <label>المساحة (م²): <input name="area" type="number" /></label><br/>
  <label>غرف: <input name="bedrooms" type="number" /></label><br/>
  <label>حمامات: <input name="bathrooms" type="number" /></label><br/>
  <label>الدور: <input name="floor" type="number" /></label><br/>
  <label>الموقع: <input name="location" /></label><br/>
  <label>الوصف: <textarea name="description"></textarea></label><br/>
  <button type="submit">نشر العقار</button>
  {#if form?.error}<p style="color:red">{form.error}</p>{/if}
</form>