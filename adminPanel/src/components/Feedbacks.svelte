<script>
  import { feedbacksData } from "../store";
  import Feedback from "./Feedback.svelte";

  export let socket;
</script>

<div class="container">
  <div class="info">
    feedbacks
  </div>
  
  {#if $feedbacksData}
    <div class="content">
      {#each $feedbacksData as item (item.feedback_id)}
        <Feedback feedbacksData={item} />
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