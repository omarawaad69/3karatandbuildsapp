<script>
  import { page } from '$app/stores';
  export let data;
  let messages = data.messages;
  let newMsg = '';

  async function send() {
    await fetch(`/api/messages/${data.otherUser.id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newMsg, property_id: $page.url.searchParams.get('property') })
    });
    newMsg = '';
    const res = await fetch(`/api/messages/${data.otherUser.id}`);
    messages = await res.json();
  }
</script>

<h1>محادثة مع {data.otherUser.username}</h1>
<div class="chat">
  {#each messages as m}
    <div class:me={m.sender_id === data.currentUser.id}>
      <p>{m.content} <small>{new Date(m.created_at).toLocaleTimeString()}</small></p>
    </div>
  {/each}
</div>
<form on:submit|preventDefault={send}>
  <input bind:value={newMsg} placeholder="اكتب رسالة..." />
  <button type="submit">إرسال</button>
</form>

<style>
  .chat { max-height: 400px; overflow-y: auto; border:1px solid #ccc; padding:1rem; margin-bottom:1rem; }
  .me { text-align: right; background: #dcf8c6; padding: 0.5rem; border-radius: 8px; }
</style>