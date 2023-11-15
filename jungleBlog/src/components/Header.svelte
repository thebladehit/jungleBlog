<header>
    <nav>
        <a href="#articles">Articles</a>
        <a href="#about">About</a>
        <a href="#support">Support</a>
        <a href="#donate">Donate</a>
    </nav>
    <div class="theme-switcher">
        <input type="checkbox" id="theme-toggle"/>
        <label for="theme-toggle" class="toggle">
            <span class="toggle-handler"></span>
        </label>
    </div>
</header>


<style>
    :global(body) {
        margin: 0;
        padding: 0;
    }

    header {
        background-color: #1a4814;
        color: white;
        padding: 1rem;
        margin: 0;
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
        color: white;
        text-decoration: none;
        padding: 0.5rem;
    }

    .theme-switcher {
        position: absolute;
        right: 25%;
        top: 56%;
        transform: translateY(-50%);
    }

    .toggle {
        cursor: url("../assets/images/pointer.png"), pointer;
        display: inline-block;
        position: relative;
        width: 50px;
        height: 25px;
        background-color: #ccc;
        border-radius: 25px;
    }

    .toggle-handler {
        background-color: #fff;
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
