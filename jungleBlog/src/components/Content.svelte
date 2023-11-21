<script>
    import photo from '/res/sixth.png';
</script>

<div class="title">
    <div class="first">
        <h1>Survival a Jungle</h1>
        <p class="leftParagraph">Within the jungle's heart, emerald leaves weave tales of mystery in nature's sacred hush.</p>
    </div>
    <div class="second">
        <h1>Deserted Island</h1>
        <p class="rightParagraph">On the deserted island, golden sands meet beneath the boundless sky.</p>
    </div>
</div>

<div class="main">
    <div class="leftText">
        <p>
            On an island, sands embrace sea,<br>
            Nature's whispers, tranquility.<br>
            Palm trees dance, shadows play,<br>
            Isolation's refuge, serenity's bay.<br>
            Time pauses beneath the sky,<br>
            Sun-kissed solitude, untie.<br>
            Footprints weave a tale untold,<br>
            Nature's sanctuary, stories unfold.<br>
            Ocean breeze, golden sand,<br>
            Deserted island, a tranquil stand.<br>
            Whispers echo, waves conspire,<br>
            Solitude's dance, nature's lyre.<br>
        </p>   
    </div>
    <div class="photo">
        <img src={photo} alt="main img" />
    </div>
    <div class="rightText">
        <p>Jungle whispers, wild and free,<br>
            Life's dance beneath the green tree.<br>
            Vines entwine, a verdant brace,<br>
            Survival's trial, nature's grace.<br>
            Roaring beasts in shadows hide,<br>
            Eyes gleam with instinct's pride.<br>
            Rivers whisper tales untold,<br>
            Secrets in green, ancient and bold.<br>
            Underneath the leafy sweep,<br>
            Heart beats, nature's rhythmic keep.<br>
            Adapt or falter, jungle's decree,<br>
            Life's wild symphony, a jubilee.
        </p>
    </div>
</div>

<style>
    h1 {
        font-size: 55px;
        font-weight: 400;
    }

    p {
        font-size: 12px;
        line-height: 2.5em;
    }

    img {
        width: 100%;
        margin-top: -130px;
    }

    .title {
        display: flex;
        justify-content: space-between;
    }
    
    .second {
        text-align: right;
    }

    p.leftParagraph {
        margin-top: -25px;
        max-width: 400px;
    }

    p.rightParagraph {
        float: right;
        margin-top: -25px;
        max-width: 400px;
    }

    .rightText p {
        text-align: right;
    }

    .main {
        margin-top: 50px;
        display: flex;
        justify-content: space-between;
    }

    .photo {
        text-align: center;
        width: 60%;
    }
</style>