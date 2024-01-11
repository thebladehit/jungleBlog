<script>
  import Comment from "./Comment.svelte";
  import { commentsData } from "../store";

  export let socket;

  const sendDeleteComment = (id) => {
    socket.send(JSON.stringify({ msgType: 'newComment', data: { storyId: id } }));
  };
</script>

<div class="container">
  <div class="info">
    comments
  </div>

  {#if $commentsData}
    <div class="content">
      {#each $commentsData as item (item.comment_id)}
        <Comment commentData={item} sendDeleteComment={sendDeleteComment}/>
      {/each}
    </div>
  {:else}
    <p>Loading...</p>
  {/if}

</div>

<style>
  .info {
    text-align: center;
  }
</style>