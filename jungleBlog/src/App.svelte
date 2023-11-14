<script>
    import Header from "./components/Header.svelte";
    import Footer from "./components/Footer.svelte";
    import Content from "./components/Content.svelte";
</script>

<div class="app-container">
    <Header/>
    <Content/>
    <Footer/>
</div>

<style>
    .app-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
</style>
