<script>
    export let article;
</script>

<div class="card">
    <div class="text-content">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
    </div>
    <div class="image-content">
        <img src={article.image} alt={article.title} />
    </div>
</div>

<style>
    .card {
        width: 400px;
        height: 350px;
        background-color: #c8eac1;
        color: black;
        overflow: hidden;
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-family: 'Inknut Antiqua', serif;
        cursor: url("../assets/images/pointer.png"), pointer;
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
        background-color: #1a4814;
        border-radius: 5px;
    }

    .image-content {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .image-content img {
        max-width: 100%;
        max-height: 200px;
        object-fit: cover;
    }

    p {
        font-size: 1rem;
        line-height: 1.6;
    }
</style>


