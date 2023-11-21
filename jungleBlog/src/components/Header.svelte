<script>
    function toggleTheme(){
        const body = document.body;
        body.dataset.theme = body.dataset.theme === 'dark' ? 'default' : 'dark';
    }
</script>

<header>
    <nav>
        <a href="#articles">Articles</a>
        <a href="#about">About</a>
        <a href="#support">Support</a>
        <a href="#donate">Donate</a>
    </nav>
    <div class="theme-switcher">
        <input on:click={toggleTheme} type="checkbox" id="theme-toggle"/>
        <label for="theme-toggle" class="toggle">
            <span class="toggle-handler"></span>
        </label>
    </div>
</header>


<style>
    header {
        background-color: var(--header-background-color);
        color: var(--header-color);
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        font-family: 'Inknut Antiqua', serif;
    }

    nav {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }

    nav a {
        color: #EAFFE0;
        text-decoration: none;
        padding: 1.5rem;
        font-weight: 700;
        font-size: 20px;
        transition: linear .3s;
    }

    nav a:hover {
        color: #d0fabd;
    }

    .theme-switcher {
        position: absolute;
        right: 25%;
        top: 56%;
        transform: translateY(-50%);
    }

    .toggle {
        cursor: url("../../public/res/pointer.png"), pointer;
        display: inline-block;
        position: relative;
        width: 50px;
        height: 25px;
        background-color: #EAFFE0;
        border-radius: 25px;
    }

    .toggle-handler {
        background: #1a4814;
        border-radius: 50%;
        position: absolute;
        left: 2px;
        top: 2px;
        width: 21px;
        height: 21px;
        transition: all 0.3s ease;
    }

    #theme-toggle:checked + .toggle .toggle-handler {
        transform: translateX(25px);
    }

    #theme-toggle {
        display: none;
    }
</style>
