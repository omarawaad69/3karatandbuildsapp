<script>
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  $: if (!$page.data.user || $page.data.user.role !== 'admin') {
    goto('/login');
  }
</script>

<nav style="display:flex; gap:15px; background:#34495e; padding:1rem; color:white;">
  <a href="/admin">🏠 الرئيسية</a>
  <a href="/admin/users">المستخدمين</a>
  <a href="/admin/properties">العقارات</a>
  <a href="/admin/transactions">المبيعات</a>
  <a href="/admin/reports">البلاغات</a>
  <a href="/admin/settings">الإعدادات</a>
</nav>
<slot />