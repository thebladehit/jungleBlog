<script>
    import {Router, Route, Link} from "svelte-routing";
    import Header from "./components/Header.svelte";
    import Footer from "./components/Footer.svelte";
    import Main from "./components/Main.svelte";
    import Article from "./components/Article.svelte";
    import AboutUs from "./components/AboutUs.svelte";
</script>

<div class="app-container">
    <Header/>

    <Router>
        <Route path = "/" component={Main}/>
        <Route path="article/:id" let:params>
            <Article id={params.id} />
        </Route>
        <Route path="about" component={AboutUs}/>
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
