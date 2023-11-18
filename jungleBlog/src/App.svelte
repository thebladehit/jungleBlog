<script>
    import {Router, Route, Link} from "svelte-routing";
    import Header from "./components/Header.svelte";
    import Footer from "./components/Footer.svelte";
    import Main from "./components/Main.svelte";
    import Article from "./components/Article.svelte";
</script>

<div class="app-container">
    <Header/>
    <Router>
        <Route path = "/" component={Main}/>
        <Route path = "article/:id" component={Article}/>
    </Router>
    <Footer/>
</div>

<style>
    .app-container {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
</style>
