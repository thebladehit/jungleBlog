<script>
    let isNavOpen = false;

    function toggleTheme(){
        const body = document.body;
        body.dataset.theme = body.dataset.theme === 'dark' ? 'default' : 'dark';
    }

    function toggleNav() {
        isNavOpen = !isNavOpen;
    }
</script>

<header>
    <div class="burger-menu {isNavOpen ? 'change' : ''}" on:click={toggleNav}>
        <span></span>
        <span></span>
        <span></span>
    </div>
    <nav class="{isNavOpen ? 'open' : ''}">
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
        right: 17%;
        top: 56%;
        transform: translateY(-50%);
    }

    .toggle {
        cursor: url("/pointer.png"), pointer;
        display: inline-block;
        position: relative;
        width: 50px;
        height: 25px;
        background-color: #EAFFE0;
        border-radius: 25px;
    }

    .toggle-handler {
        background: var(--header-background-color);
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

    .burger-menu {
        display: none;
        cursor: pointer;
        position: absolute;
        left: 20px;
        top: 15px;
        flex-direction: column;
        justify-content: space-around;
        width: 30px;
        height: 25px;
    }

    .burger-menu span {
        display: block;
        height: 3px;
        width: 100%;
        background-color: #EAFFE0;
        transition: transform 0.3s ease, opacity 0.3s ease;
    }

    .burger-menu.change span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .burger-menu.change span:nth-child(2) {
        opacity: 0;
        transform: translateX(20px);
    }

    .burger-menu.change span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }

    @media (max-width: 900px) {
        .burger-menu {
            display: flex;
        }

        nav {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 20px;
            transition: max-height 0.6s ease, opacity 0.6s ease, transform 0.6s ease;
            max-height: 0;
            opacity: 0;
            overflow: hidden;
            position: absolute;
            background-color:  var(--header-background-color);
            top: 60px;
            left: 0;
            width: 100%;
            transform: translateY(-10px);
            padding: 15px;
            box-sizing: border-box;
        }

        nav.open {
            max-height: 35vh;
            opacity: 1;
            transform: translateY(0);
        }

        nav a {
            padding: 5px;
            text-align: center;
            margin: 0;
            border-bottom: 1px solid #EAFFE0;
        }
    }

    @media (max-width: 1300px){
        .theme-switcher{
            right: 10px;
        }
    }
</style>
