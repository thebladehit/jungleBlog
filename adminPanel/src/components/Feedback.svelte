<script>
  import { formatDateTime } from "../utils";

  export let feedbacksData;
</script>

<div class="feedback">
  <div class="info">
    <p>Name: <span class="bold">{feedbacksData.name}</span></p>
    <p>Feedback id: <span class="bold">{feedbacksData.feedback_id}</span></p>
    <p>Text: <span class="bold">{feedbacksData.text}</span></p>
  </div>
  <div class="created-at">
    <span class="bold">{formatDateTime(feedbacksData.created_at)}</span>
  </div>
</div>

<style>
  p {
    margin-top: 0;
  }

  .bold {
    font-weight: 700;
  }

  .feedback {
    padding: 2%;
    padding-bottom: 5%;
    border-radius: 8px;
    background-color: rgb(31, 31, 31);
    margin-top: 20px;
  }

  .created-at {
    float: right;
  }
</style>