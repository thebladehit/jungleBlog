<script>
  import { onMount } from "svelte";
  import Login from "./components/Login.svelte";
  import Navigation from "./components/Navigation.svelte";
  
  let logined = false;

  const handleLogin = async (login, password) => {
    const response = await fetch('http://' + import.meta.env.VITE_HOST + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, password })
    });
    if (response.ok) logined = true;
  };

  onMount(async () => {
    const response = await fetch('http://' + import.meta.env.VITE_HOST + '/login', { method: 'GET' });
    if (response.ok) {
      logined = true;
      console.log('here');
    }
  });
</script>

<div class="app-caontainer">
  {#if logined}
    <Navigation />
  {:else}
    <Login handleLogin={handleLogin} />
  {/if}
</div>