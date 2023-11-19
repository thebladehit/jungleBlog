<script>
  import Content from "./Content.svelte";
  import Card from "./Card.svelte";

  import { articles } from "../articles.js";

  import { Router, Route, Link} from "svelte-routing";
</script>

<div class="content-wrapper">
  <Content />
</div>

<div class="cards-container">
  {#each articles as article}
    <Link to={`article/${article.id}`}>
      <Card {article} />
    </Link>
  {/each}
</div>

<style>
  .content-wrapper {
    max-width: 1268px;
    margin: 0 auto;
    padding: 2rem;
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