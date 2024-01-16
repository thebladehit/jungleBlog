<script>
  import photo from '/res/mainPhoto.png';
  import photoDark from '/res/mainPhotoDark.png';

  const isDark = localStorage.getItem('theme');
  let photoUrl = isDark === 'dark' ? photoDark : photo;

  document.querySelector('.theme-switcher').addEventListener('click', () => {
    const isDark = localStorage.getItem('theme');
    photoUrl = isDark === 'dark' ? photoDark : photo;
  });
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
        <img src={photoUrl} alt="main img" />
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

    @media (max-width: 900px) {
        .title {
            display: grid;
            justify-content: center;
        }

        .second, .photo, .rightText, .leftParagraph {
            visibility: hidden;
        }
        h1 {
            font-size: 5vw;
        }
        .first{
            text-align: center;
        }
        .leftText {
            margin-top: -35vw;
            margin-bottom: -90vw;
            text-align: center;
            width: 100%;
        }

        .leftText p{
            font-size: 3vw;
        }

        .main {
            display: flex;
            justify-content: center;
            flex-direction: column;
        }
    }

    @media (max-width: 500px) {
        .leftText {
            margin-top: -50vw;
            margin-bottom: -110vw;
            text-align: center;
            width: 100%;
        }
    }

    @media (min-width: 900px) and (max-width: 1300px){
        .rightText, p.rightParagraph, .second h1{
            margin-right: 10px;
        }
        .leftText, p.leftParagraph, .first h1{
            margin-left: 10px;
        }
        img{
            margin-top: -100px;
        }
    }

    @media (min-width: 750px) and (max-width: 900px){
        .leftText {
            margin-bottom: -80vw;
        }
    }
</style>