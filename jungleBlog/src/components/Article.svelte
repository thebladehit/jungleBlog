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
                <div class="date">12.11.2023 | 12:36</div>
            </div>
        {/each}
    </section>
</main>

<style>
    * {
        box-sizing: border-box;
    }

    main {
        background-color: var(--main-background-color);
        max-width: 1268px;
        margin: auto;
        margin-bottom: 50px;
        padding: 20px;
    }

    h1 {
        font-size: 48px;
        padding: 0;
        margin: 0;
    }

    h2 {
        font-size: 20px;
        margin-bottom: -10px;
    }

    p {
        line-height: 2.0em;
    }

    input {
        height: 50px;
    }

    textarea {
        height: 130px;
        resize: none;
    }

    .content-container {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
        background-color: var(--main-background-color);
        border-bottom: 3px solid var(--main-color);
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
        background-color: var(--comments-background);
    }

    .form-section{
        background-color: var(--main-background-color);
    }

    .form-section input, .form-section textarea {
        font-family: 'Inknut Antiqua', serif;
        font-size: 20px;
        background-color: var(--form-section-background);
        color: var(--form-color);
        width: 100%;
        padding: 10px 20px;
        margin-bottom: 10px;
        border: none;
        border-radius: 15px;
    }

    ::placeholder {
        color: var(--form-placeholer-color);
    }

    .button-container {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .form-section button {
        background-color: var(--form-section-background);
        font-size: 20px;
        color: var(--main-color);
        border: none;
        border-radius: 20px;
        transition: background-color 0.3s ease;
        width: 300px;
        height: 50px;
        font-family: 'Inknut Antiqua', serif;
    }

    .form-section button:hover {
        background-color: var(--button-hover-color);
    }

    .comments-section {
        padding: 20px 30px;
        box-shadow: 8px 8px 5px rgba(0, 0, 0, 0.3);
        width: calc(100% - 40px);
        margin-left: 20px;
    }

    .comment {
        border-bottom: 1px solid #013413;
        padding-bottom: 10px;
        padding-left: 20px;
        margin-bottom: 10px;
    }

    .comment p {
        font-size: 20px;
    }

    .date {
        font-size: 14px;
        font-weight: 700;
        text-align: right;
    }

    .comment:last-child {
        border-bottom: none;
    }
</style>
