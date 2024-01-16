<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  let showContent = false;

  onMount(() => {
    setTimeout(() => {
      showContent = true;
    }, 100);
  });
</script>

<div class="content">
    {#if showContent}
     <h1 in:fade={{duration: 1000}}>About My Blog</h1>
     <div class="text-image-wrapper">
         <div class="text" in:fade={{duration: 1000}}>
             <p>Hello, my brave readers!</p>
             <p>I'm a beginner in the world of survival, and this is my blog where I share my unique experience of surviving on a deserted island in the jungle.
                Why am I here? I'm seeking adventure, testing myself, learning skills forgotten by the modern world, and of course, sharing it all with you.</p>
             <p>Every day here is a new challenge. I write about how I build shelters from what I find in the jungle, how I find and purify water, gather food, or even try hunting.
                I share my successes and failures, moments of joy and despair. But this blog isn't just about survival. It's also about connecting with nature, self-discovery, and
                finding inner strength. I explore the environment, observe wildlife, try to understand the island's ecosystem, and my place in it. In this blog, you'll find not
                only a description of my adventures but also photos, survival tips, information about the plants and animals I encounter, and much more. I want to share everything
                I learn with you and possibly inspire someone for their own adventures.</p>
             <p> So, if you're interested in nature, survival, or just want to feel part of something extraordinary, welcome to my blog. Join my adventure and discover the unknown
            with me!</p>
         </div>
            <div class="image" in:fade={{duration: 1000}}>
                <img src="/res/AboutUs.png" alt="aboutUsImg"/>
            </div>
        </div>
    {/if}
 </div>


<style>
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        max-width: 1268px;
        width: 100%;
        height: 85vh;
        margin: auto;

    }

    .content h1 {
        text-align: center;
    }

    .text-image-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    .text {
        width: 60%;
    }

    .image {
        width: 40%;
        text-align: center;
    }

    .image img {
        max-width: 100%;
        height: auto;
        max-height: 600px;
        border-radius: 20px;
    }

    @media (max-width: 900px) {
        .image {
            display: none;
        }
        .content {
            font-size: 13px;
        }
    }

    @media (max-width: 600px) {
        .content {
            font-size: 11px;
        }
    }

    @media (max-width: 400px) {
        .content {
            font-size: 9px;
        }
    }
</style>