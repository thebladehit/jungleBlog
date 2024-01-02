<script>
    import {fade} from 'svelte/transition';
    import {onMount} from "svelte";
    import {articlesData} from "../articlesStore.js";
    export let id;

    let showContent = false;

    onMount(() => {
        setTimeout(() => showContent = true, 100)
    })

    $: article = $articlesData.find(a => a.story_id === parseInt(id));

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
    {#if showContent}
        <div class="content-container" in:fade={{ x: 200, duration: 1000 }}>
            <section class="text-section">
                <h1>{article.title}</h1>
                <div class="image-section">
                    <img src="https://plus.unsplash.com/premium_photo-1673288456151-4f7b871863c9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt={article.title} />
                </div>
                <p>{article.content}</p>
            </section>
        </div>
    <section class="form-section" in:fade={{ x: 200, duration: 1000 }}>
        <input bind:value={name} placeholder="Name" />
        <textarea bind:value={comment} placeholder="Your comment"></textarea>
        <div class="button-container">
            <button on:click={sendFeedback}>Send</button>
        </div>
    </section>
    <section class="comments-section" in:fade={{ x: 200, duration: 1000 }}>
        {#each comments as comment}
            <div class="comment">
                <h2>{comment.name}</h2>
                <p>{comment.text}</p>
                <div class="date">12.11.2023 | 12:36</div>
            </div>
        {/each}
    </section>
    {/if}
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
        margin-bottom: 20px;
        background-color: var(--main-background-color);
        border-bottom: 3px solid var(--main-color);
    }

    .text-section {
        padding: 20px;
    }

    .text-section h1 {
        font-size: 48px;
        margin-bottom: 20px; /* Додаємо відступ між заголовком та зображенням */
    }

    .text-section p {
        white-space: pre-line;
        margin-top: 20px; /* Додаємо відступ між зображенням та текстом */
    }

    .image-section {
        float: right; /* Зображення буде спливати праворуч */
        margin-left: 20px; /* Відступ зліва для обтікання тексту */
        width: 50%; /* Регулюйте ширину за бажанням */
    }

    .image-section img {
        max-width: 100%;
        max-height: 500px;
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

    @media (max-width: 600px){
        .content-container {
            flex-direction: column;
        }

        .text-section, .image-section {
            width: 100%;
        }

        .image-section {
            order: -1;
        }
    }

</style>
