<script>
  import { formatDateTime } from "../utils";

  export let storyData;
  export let sendUpdateStory;

  const updateStory = async () => {
    const response = await fetch(import.meta.env.VITE_PROTOCOL + '://' + import.meta.env.VITE_HOST + '/story', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ story_id: storyData.story_id, content: storyData.content})
    });
    if (!response.ok) {
      throw new Error('Network error');
    }
    sendUpdateStory();
  };
</script>

<div class="story">
  <div class="info">
    <p>Title: <span class="bold">{storyData.title}</span></p>
    <p>Story id: <span class="bold">{storyData.story_id}</span></p>
    <p><textarea bind:value={storyData.content}></textarea></p>
  </div>
  <button on:click={updateStory}>Save</button>
  <div class="created-at">
    <span class="bold">{formatDateTime(storyData.created_at)}</span>
  </div>
</div>


<style>
  p {
    margin-top: 0;
  }

  textarea {
    width: 100%;
    height: 400px;
    background-color: rgb(44, 44, 44);
    color: #fff;
    resize: none;
    border: 0;
  }

  .bold {
    font-weight: 700;
  }

  .story {
    padding: 2%;
    border-radius: 8px;
    background-color: rgb(31, 31, 31);
    margin-top: 20px;
  }

  .created-at {
    float: right;
  }
</style>