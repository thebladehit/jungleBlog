<script>
  export let handleLogin;

  let login = '';
  let password = '';

  const handleSubmit = async () => {
    await handleLogin(login, password);
  };
</script>

<div class="form">
  <form on:submit|preventDefault={handleSubmit}>
    <input bind:value={login} type="text" placeholder="Login" />
    <br>
    <input bind:value={password} type="password" placeholder="Password" />
    <br>
    <button type="submit">Sign in</button>
  </form>
</div>

<style>
  .form {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input {
    height: 40px;
    width: 300px;
    margin-bottom: 20px;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    color: #d9dafa;
    transition: 0.25s;
  }

  input:focus,
  input:focus-visible {
    outline: none;
    border-color: #646cff;
  }

  button {
    width: 100%
  }
</style>