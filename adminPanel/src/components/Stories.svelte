<script>
  import { storiesData } from "../store";
  import Story from "./Story.svelte";

  export let socket;

  const sendUpdateStory = () => {
    socket.send(JSON.stringify({ msgType: 'newPost' }));
  }
</script>

<div class="container">
  <div class="info">
    stories
  </div>
  <div class="content">
    {#if storiesData}
      {#each $storiesData as item (item.story_id)}
        <Story storyData={item} sendUpdateStory={sendUpdateStory} />
      {/each}
    {:else}
      <p>Loading...</p>
    {/if}
  </div>
</div>

<style>
  .info {
    text-align: center;
  }
</style>