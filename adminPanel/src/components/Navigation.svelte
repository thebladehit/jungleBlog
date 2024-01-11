<script>
  import Feedbacks from "./Feedbacks.svelte";
  import Comments from "./Comments.svelte";
  import Stories from "./Stories.svelte";
  import { onMount } from "svelte";
  import { commentsData, fetchComments } from "../store";

  let socket;
  $: curComponent = Comments;

  const setComment = () => curComponent = Comments;
  const setFeedback = () => curComponent = Feedbacks;
  const setStory = () => curComponent = Stories;

  onMount(async () => {
    commentsData.set(await fetchComments());
    socket = new WebSocket('ws://' + import.meta.env.VITE_HOST);
    socket.addEventListener('message',async (msg) => {
      const msgData = JSON.parse(msg.data);
      if (msgData.msgType = 'reloadComments') {
        commentsData.set(await fetchComments());
      }
    });
  });
</script>

<div class="navigation-container">
  <div class="content">
    <svelte:component this={curComponent} socket={socket}/>
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
    margin-bottom: 60px;
  }
</style>