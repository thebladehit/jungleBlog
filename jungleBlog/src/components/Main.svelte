<script>
  import Content from "./Content.svelte";
  import Card from "./Card.svelte";
  import { articles } from "../articles.js";
</script>

<div class="content-wrapper">
  <Content />
</div>

<div class="cards-container">
  {#each articles as article}
    <Card {article} />
  {/each}
</div>

<style>
  .content-wrapper {
    max-width: 1268px;
    margin: 0 auto;
    margin-bottom: 50px;
    font-family: 'Inknut Antiqua', serif;
  }

  .cards-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 20px;
    row-gap: 20px;
    margin-top: 60px;
    width: 1268px;
    height: auto;
    margin: 0 auto;
    margin-bottom: 60px;
  }
</style>