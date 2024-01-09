<script>
    import Comment from "./Comment.svelte";

  const fetchComments = async () => {
    const response = await fetch(import.meta.env.VITE_HOST + '/comment', { method: 'GET' });
    if (!response.ok) throw new Error('Network error');
    return await response.json();
  };
</script>

<div class="container">
  <div class="info">
    comments
  </div>

  {#await fetchComments()}
    <p>Loading...</p>
  {:then data}
    <div class="content">
      {#each data as item (item.comment_id)}
        <Comment commentData={item} />
      {/each}
    </div>
  {:catch err}
    <p>Error: {err.message}</p>
  {/await}
</div>

<style>
  .info {
    text-align: center;
  }
</style>