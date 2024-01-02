<script>
  import Content from "./Content.svelte";
  import Card from "./Card.svelte";

  import {articlesData, fetchArticles} from "../articlesStore.js";

  import { Router, Route, Link} from "svelte-routing";

  import {onMount} from "svelte";

  onMount(() => {
    fetchArticles()
  })
</script>

<div class="content-wrapper">
  <Content />
  <div class="cards-container">
    {#each $articlesData as article}
      <Link to={`article/${article.story_id}`}>
        <Card {article} />
      </Link>
    {/each}
  </div>
</div>

<style>
  .content-wrapper {
    max-width: 1268px;
    margin: 0 auto;
    margin-bottom: 50px;
    width: 100%;
  }

  .cards-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    column-gap: 20px;
    row-gap: 20px;
    margin-top: 60px;
    height: auto;
    margin-bottom: 60px;
  }

  @media (max-width: 900px) {
    .content-wrapper{
      margin: 0;
    }

    .cards-container{
      margin: 0 auto;
      margin-bottom: 50px;
      grid-template-columns: repeat(1, 1fr);
      width: 90%;
    }
  }

  @media (min-width: 900px) and (max-width: 1300px){
    .cards-container{
      margin-right: 10px;
      margin-left: 10px;
    }
  }

</style>