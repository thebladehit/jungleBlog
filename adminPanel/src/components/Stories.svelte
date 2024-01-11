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
  {#if storiesData}
    <div class="content">
      {#each $storiesData as item (item.story_id)}
        <Story storyData={item} sendUpdateStory={sendUpdateStory} />
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