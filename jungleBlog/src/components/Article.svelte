<script>
    import {fade} from 'svelte/transition';
    import {onMount} from "svelte";
    import {articlesData, fetchArticles} from "../articlesStore.js";
    export let id;

    let article;
    let showContent = false;
    let comments = [];
    let name = '';
    let commentText = '';

    const socket = new WebSocket("ws://localhost:3000")

    onMount(async () => {
        socket.addEventListener("message", (msg) =>{
            msg = JSON.parse(msg.data)
            if (msg.msgType === "reloadComments" && msg.data.storyId === id){
                getCommentsById()
            }
        })

        await fetchArticles();
        await getCommentsById();

        article = $articlesData.find(a => a.story_id === parseInt(id));

        if (article) {
            showContent = true;
        } else {
            console.log("Article not found!");
        }
    });

    async function sendComment() {
        if ( name.trim().length === 0 || commentText.trim().length === 0 ){
            alert('Fill all fields!');
        } else {
            const commentData = {
                story_id: parseInt(id),
                username: name,
                comment_text: commentText,
            };

            try {
                const response = await fetch('http://localhost:3000/comment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(commentData),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }


                socket.send(JSON.stringify({ msgType: 'newComment', data: { storyId: id }}))

            } catch (error) {
                console.error('Error creating comment:', error);
            }

            name = '';
            commentText = '';
        }
    }

    async function getCommentsById(){
        try {
            const response = await fetch(`http://localhost:3000/comment/${parseInt(id)}`, {
                method: 'GET',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const commentsById = await response.json();

            comments = [...commentsById];

        } catch (error) {
            console.error('Error getting comment:', error);
        }
    }

    function formatLocalDateTime(isoString) {
        const date = new Date(isoString);
        return date.toLocaleString(navigator.language, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }

</script>

<main>
    {#if showContent}
        <div class="content-container" in:fade={{ x: 200, duration: 1000 }}>
            <section class="text-section">
                <h1>{article.title}</h1>
                <div class="image-section">
                    <img src={article.image_url} alt={article.title} />
                </div>
                <p>{article.content}</p>
            </section>
        </div>
    <section class="form-section" in:fade={{ x: 200, duration: 1000 }}>
        <input bind:value={name} placeholder="Name" />
        <textarea bind:value={commentText} placeholder="Your comment"></textarea>
        <div class="button-container">
            <button on:click={sendComment}>Send</button>
        </div>
    </section>
    <section class="comments-section" in:fade={{ x: 200, duration: 1000 }}>
        {#each comments as item}
            <div class="comment">
                <h2>{item.username}</h2>
                <p>{item.comment_text}</p>
                <div class="date">{formatLocalDateTime(item.created_at)}</div>
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
        margin-bottom: 20px;
    }

    .text-section p {
        white-space: pre-line;
        margin-top: 20px;
    }

    .image-section {
        float: right;
        margin-left: 10px;
        padding-left: 50px;
        width: 40%;
    }

    .image-section img {
        max-width: 100%;
        max-height: 400px;
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

        .image-section {
            margin-left: 0;
            padding-left: 0;
            width: 50%;
        }
    }
</style>
