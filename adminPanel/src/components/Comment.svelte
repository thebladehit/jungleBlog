<script>
  import { formatDateTime } from "../utils";

  export let commentData;
  export let sendDeleteComment;

  const deleteComment = async () => {
    const response = await fetch('http://' + import.meta.env.VITE_HOST + '/comment', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment_id: commentData.comment_id })
    });
    if (!response.ok) {
      throw new Error('Network error');
    }
    sendDeleteComment(commentData.story_id);
  };
</script>

<div class="comment">
  <div class="info">
    <p>Name: <span class="bold">{commentData.username}</span></p>
    <p>Story id: <span class="bold">{commentData.story_id}</span></p>
    <p>Text: <span class="bold">{commentData.comment_text}</span></p>
  </div>
  <button on:click={deleteComment}>DELETE</button>
  <div class="created-at">
    <span class="bold">{formatDateTime(commentData.created_at)}</span>
  </div>
</div>

<style>
  p {
    margin-top: 0;
  }

  .bold {
    font-weight: 700;
  }

  .comment {
    padding: 2%;
    border-radius: 8px;
    background-color: rgb(31, 31, 31);
    margin-top: 20px;
  }

  .created-at {
    float: right;
  }
</style>