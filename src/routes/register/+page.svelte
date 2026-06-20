<script>
  import { enhance } from '$app/forms';
  export let form;
</script>

<h1>إنشاء حساب</h1>
<form method="POST" use:enhance>
  <label>اسم المستخدم: <input name="username" required /></label><br/>
  <label>البريد الإلكتروني: <input name="email" type="email" /></label><br/>
  <label>كلمة المرور: <input name="password" type="password" required /></label><br/>
  <button type="submit">تسجيل</button>
  {#if form?.error}<p style="color:red">{form.error}</p>{/if}
</form>