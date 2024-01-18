<script>
  export let article;

  $: shortenedTitle = article.title.length > 25
    ? article.title.slice(0, 25) + '...'
    : article.title;

</script>

<div class="card">
    <div class="text-content">
        <h1>{shortenedTitle}</h1>
    </div>
    <div class="image-content">
        <img src={article.image_url} alt={article.title} />
    </div>
</div>

<style>
    .card {
        background-color: var(--card-background-color);
        color: var(--main-color);
        width: 100%;
        height: 350px;
        overflow: hidden;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: url("/res/pointer.png"), pointer;
    }

    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    .text-content {
        padding: 0.5rem;
        text-align: center;
    }

    .text-content h1 {
        font-weight: 400;
        font-size: 1.5rem;
        margin-bottom: 0.25rem;
        position: relative;
        padding-bottom: 0.5rem;
        padding-left: 1rem;
        text-align: left;
    }

    .text-content h1:after {
        content: '';
        position: absolute;
        left: 1rem;
        bottom: 0;
        width: calc(100% - 2rem);
        height: 3px;
        background-color: var(--card-line-color);
        border-radius: 5px;
    }

    .image-content {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .image-content img {
        width: 80%;
        max-height: 200px;
        object-fit: cover;
    }
</style>

