<script>
  import { page } from '$app/stores';
  $: user = $page.data.user;
</script>

<header>
  <nav>
    <a href="/">الرئيسية</a>
    {#if user}
      <a href="/property/new">أضف عقار</a>
      <a href="/dashboard">لوحتي</a>
      <a href="/favorites">المفضلة</a>
      <a href="/messages">الرسائل</a>
      {#if user.role === 'admin'}
        <a href="/admin">الإدارة</a>
      {/if}
      <span>👤 {user.username}</span>
      <a href="/logout">خروج</a>
    {:else}
      <a href="/login">دخول</a>
      <a href="/register">تسجيل</a>
    {/if}
  </nav>
</header>

<main>
  <slot />
</main>

<style>
  :global(body) { margin:0; font-family: Arial, sans-serif; background:#f4f6f9; }
  header { background: #2c3e50; color: white; padding: 1rem; }
  nav { display: flex; gap: 15px; align-items: center; flex-wrap: wrap; }
  nav a { color: white; text-decoration: none; }
  main { padding: 2rem; max-width: 1100px; margin: auto; }
</style>