<main>
    <h1>Feedback</h1>
    <h2>You can ask questions or leave feedback here. We are glad to hear from you.</h2>
    <section class="form-section">
        <input  placeholder="Name" />
        <input  placeholder="Email" />
        <textarea placeholder="Feedback"></textarea>
        <div class="button-container">
            <button >Send</button>
        </div>
    </section>
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