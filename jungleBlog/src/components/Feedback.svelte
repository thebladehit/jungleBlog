<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { websocket } from '../websocketStore.js';

  let url = import.meta.env.VITE_SERVER_URL;
  let showContent = false;
  let name = '';
  let feedback_text = '';
  let socket;

  onMount(() => {
    const unsubscribe = websocket.subscribe((ws) => {
      socket = ws;
    });

    setTimeout(() => {
      showContent = true;
    }, 100);
    name = localStorage.getItem('name') || '';

    return () => {
      unsubscribe();
    };
  });

  async function sendFeedback() {
    if (name.trim().length === 0 || feedback_text.trim().length === 0) {
      alert('Fill all fields!');
    } else {
      const feedbackData = {
        name: name,
        text: feedback_text,
      };

      try {
        const response = await fetch(`${import.meta.env.VITE_PROTOCOL}://${url}/feedbacks`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(feedbackData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify({ msgType: 'newFeedback' }));
        }
      } catch (error) {
        console.error('Error creating feedback:', error);
      }

      localStorage.setItem('name', name);
      feedback_text = '';

      alert('Thank you for your feedback!');
    }
  }
</script>

<main>
    {#if showContent}
    <h1 in:fade={{duration: 1000 }}>Feedback</h1>
    <h2 in:fade={{duration: 1000 }}>You can ask questions or leave feedback here. We are glad to hear from you.</h2>
    <section class="form-section" in:fade={{duration: 1000 }}>
        <input bind:value={name} placeholder="Name" />
        <textarea bind:value={feedback_text} placeholder="Feedback"></textarea>
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
