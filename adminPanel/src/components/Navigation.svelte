<script>
  import Feedbacks from "./Feedbacks.svelte";
  import Comments from "./Comments.svelte";
  import Stories from "./Stories.svelte";

  $: curComponent = Comments;

  const setComment = () => curComponent = Comments;
  const setFeedback = () => curComponent = Feedbacks;
  const setStory = () => curComponent = Stories;
</script>

<div class="navigation-container">
  <div class="content">
    <svelte:component this={curComponent} />
  </div>
  <div class="nav-btns">
    <button id="comments" on:click={setComment}>Comments</button>
    <button id="stories" on:click={setStory}>Stories</button>
    <button id="feedbacks" on:click={setFeedback}>Feedbacks</button>
  </div>
</div>

<style>
  .nav-btns {
    padding: 20px 15px;
    position: fixed;
    bottom: 0;
  }

  .content {
    max-width: 1280px;
    margin: 0 auto;
    padding: 1%;
  }
</style>