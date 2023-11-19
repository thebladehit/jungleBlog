<script>
    import {useLocation} from "svelte-routing";
    import {articles} from "../articles.js";

    const location = useLocation()

    let articleId;
    $: {
        if ($location) {
            const pathArray = $location.pathname.split('/');
            const pathId = pathArray[pathArray.length - 1];
            articleId = parseInt(pathId);
        }
        if ($location.pathname === '/') {
            window.location.reload()
        }
    }

    $: article = articles.find(a => a.id === articleId);

    let comments = [
        { name: 'Ryan', text: 'Lorem ipsum dolor sit amet...' },
        { name: 'Gosling', text: 'Lorem ipsum dolor sit amet...' },
    ];

    let name = '';
    let comment = '';

    function sendFeedback() {
        if ( name.trim().length === 0 || comment.trim().length === 0 ){
            alert('Fill all fields!')
        } else {
            comments = [...comments, { name, text: comment }];
            name = '';
            comment = '';
        }
    }

</script>

<main>
    <div class="content-container">
        <section class="text-section">
            <h1>{article.title}</h1>
            <p>{article.text}</p>
        </section>
        <section class="image-section">
            <img src={article.image} alt={article.title} />
        </section>
    </div>
    <section class="form-section">
        <input bind:value={name} placeholder="Name" />
        <textarea bind:value={comment} placeholder="Your comment"></textarea>
        <div class="button-container">
            <button on:click={sendFeedback}>Send</button>
        </div>
    </section>
    <section class="comments-section">
        {#each comments as comment}
            <div class="comment">
                <h2>{comment.name}</h2>
                <p>{comment.text}</p>
            </div>
        {/each}
    </section>
</main>

<style>
    * {
        box-sizing: border-box;
    }

    main {
        font-family: 'Inknut Antiqua', serif;
        background-color: #eaffe0;
        max-width: 1268px;
        margin: auto;
        margin-bottom: 50px;
        padding: 20px;
    }

    .content-container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        background-color: #eaffe0;
        border-bottom: 3px solid #013413;
    }

    .text-section, .image-section {
        width: 50%;
        padding: 0;
    }

    .text-section{
        margin-bottom: 10px;
    }

    .image-section {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .image-section img {
        max-width: 100%;
        max-height: 300px;
        border-radius: 8px;
    }

    .form-section, .comments-section {
        padding: 20px;
        margin-top: 20px;
        width: 100%;
    }

    .comments-section {
        background-color: #c8eac1;
    }

    .form-section{
        background-color: #eaffe0;
    }

    .form-section input, .form-section textarea {
        font-family: 'Inknut Antiqua', serif;
        background-color: #d6e5d3;
        color: black;
        width: 100%;
        padding: 10px;
        margin-bottom: 10px;
        border: none;
        border-radius: 15px;
    }

    .button-container {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .form-section button {
        background-color: #d6e5d3;
        color: black;
        border: none;
        border-radius: 20px;
        transition: background-color 0.3s ease;
        width: 300px;
        height: 40px;
        font-family: 'Inknut Antiqua', serif;
    }

    .form-section button:hover {
        background-color: #a49f9f;
    }

    .comments-section {
        padding: 20px;
        box-shadow: 8px 8px 5px rgba(0, 0, 0, 0.3);
        width: calc(100% - 40px);
        margin-left: 20px;
    }

    .comment {
        border-bottom: 1px solid #013413;
        padding-bottom: 10px;
        padding-left: 10px;
        margin-bottom: 10px;
    }

    .comment:last-child {
        border-bottom: none;
    }
</style>
