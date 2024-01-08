<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';

    let showContent = false;
    let name = '';
    let feedback = '';

    onMount(() => {
        setTimeout(() => {
            showContent = true;
        }, 100);
    });

    async function sendFeedback() {
        let googleFormUrl = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeyrZwbJHGNH6ApIjzNan01331WTHfUpeBrNRlTVyGo5mMCHQ/formResponse';
        let formData = new FormData();
        formData.append('entry.1405310170', name);
        formData.append('entry.228219932', feedback);

        try {
            let response = await fetch(googleFormUrl, {
                method: 'POST',
                body: formData,
                mode: 'no-cors'
            });

            if (response.ok) {
                console.log('Фідбек відправлено');
            }
        } catch (error) {
            console.error('Помилка при відправці фідбеку:', error);
        }

        name = '';
        feedback = '';
        alert('Thank you for your feedback!')
    }

</script>

<main>
    {#if showContent}
    <h1 in:fade={{duration: 1000 }}>Feedback</h1>
    <h2 in:fade={{duration: 1000 }}>You can ask questions or leave feedback here. We are glad to hear from you.</h2>
    <section class="form-section" in:fade={{duration: 1000 }}>
        <input bind:value={name} placeholder="Name" />
        <textarea bind:value={feedback} placeholder="Feedback"></textarea>
        <div class="button-container">
            <button on:click={sendFeedback}>Send</button>
        </div>
    </section>
    {/if}
</main>

<style>
    * {
        box-sizing: border-box;
    }

    h1{
        text-align: center;
    }

    main {
        background-color: var(--main-background-color);
        max-width: 1268px;
        margin: auto;
        padding: 20px;
    }

    input {
        height: 50px;
    }

    textarea {
        height: 330px;
        resize: none;
    }

    .form-section{
        padding: 20px;
        margin-top: 20px;
        width: 100%;
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
</style>
