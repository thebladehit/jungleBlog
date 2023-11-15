<script>
    import Header from "./components/Header.svelte";
    import Footer from "./components/Footer.svelte";
    import Main from "./components/Main.svelte";
</script>

<div class="app-container">
    <Header/>
    <Main/>
    <Footer/>
</div>

<style>
    .app-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
</style>
