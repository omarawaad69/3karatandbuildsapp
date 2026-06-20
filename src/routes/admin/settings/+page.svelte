<script>
  import { enhance } from '$app/forms';
  export let data;
  $: settings = data.settings;
</script>

<h1>إعدادات الموقع</h1>

<form method="POST" use:enhance>
  <label>اسم الموقع: 
    <input name="site_name" value={settings.site_name} required />
  </label><br/><br/>
  
  <label>نسبة العمولة (%): 
    <input name="commission_percent" type="number" step="0.1" min="0" max="100" value={settings.commission_percent} required />
  </label><br/><br/>
  
  <button type="submit">حفظ التغييرات</button>
  
  {#if form?.success}
    <p style="color:green">تم الحفظ بنجاح</p>
  {/if}
  {#if form?.error}
    <p style="color:red">{form.error}</p>
  {/if}
</form>