<script>
  import { onMount } from "svelte";

let { data } = $props();

onMount(() => {

const carrousel = document.querySelector('div');
const buttons = document.querySelectorAll('button');
const snappedSound = new Audio('https://assets.codepen.io/2585/snap.mp3');

// Add click handlers for both buttons
buttons.forEach((button, index) => {
  const direction = index === 0 ? -1 : 1;
  
  // Show buttons
  button.hidden = false

  button.addEventListener('click', () => {
    carrousel.scrollBy({
      left: direction * btn.parentNode.offsetWidth,
      behavior: 'smooth'
    });
    snappedSound.play();
  });
});

// Play sound when snapping occurs
carrousel.addEventListener('scrollsnapchange', () => {
  snappedSound.play();
});


});
</script>

<main>
    <header>
      <h1>Frontend Design & Development</h1>
      <p><em>2-jarige Associate Degree aan de HvA</em></p>
    </header>
    <!-- carrousel -->
    <div>
        {#each data.features as feature}
          <article>
            <h2>{feature.title}</h2>
            <blockquote>{feature.intro}</blockquote>
          </article>
        {/each}
      </div>
      
    
      <footer>
        <button type="button" hidden>← Vorige</button>    
        <button type="button" hidden>Volgende →</button>
      </footer>
  </main>
<style>
   /* The Carrousel is based on the Progressive Enhancement principle, build in seperate layers, each layer is an extra enhancement. */
@layer generic, overflow, snap, scroll-buttons, scroll-animation;

/* 1. Generic styling */
@layer generic {
  main {
    --purple: #A675F5;
    --blue: #050542;
    --blue-50: rgba(5, 5, 66, 0.5);
    --green: #66E5BF;
    --yellow: #FFFC86;
    font-family: 'Open Sans', sans-serif;
    line-height: 1.6;
    display:flex;
    flex-direction:column;
    height:100vh;
    color:var(--blue);
  }
  
  header {
    margin:0 0 4rem;
    padding:.5rem;
    background:var(--green);
    translate:-.5rem -.5rem;
    width:100%;

    h1 {
      margin: 0;
      letter-spacing: -0.05em;
      font-weight: normal;  
    }

    p {
      margin:0;
    }
  }

  :focus-visible {
    outline: 3px solid var(--blue);
    outline-offset: 3px;
  }

  a {
    color: inherit;
    &:hover, &:focus {
      text-decoration: none;
    }
  }
  
  article {
    position: relative;
    padding: 3rem 2rem;
    display: grid;
    place-content: center;

    flex: 85vw 1 0;
    --color: var(--purple);
    background: var(--color);
    scroll-snap-align: center;

    h2 {
      position:absolute;
      top:0;
      right:0;
      background: rgb(255,255, 255, .3);
      margin:0;
      padding:.25rem 1rem;
      font-weight: normal;
    }

    blockquote {
      margin: 0;
      line-height: 1.6;
      text-align: center;
      font-weight: 200;
      font-style: italic;
      font-size: calc(3rem + .5vw);
    }
  }
  
  article:nth-of-type(3n + 1) {
    --color: var(--purple);
  }
  article:nth-of-type(3n + 2) {
    --color: var(--yellow);
  }
  article:nth-of-type(3n + 3) {
    --color: var(--green);
  }
  
  footer {
    position:relative;
    margin-top:auto;
    display:flex;
    justify-content:space-between;
    width:100%;

    button {
      margin-bottom: 2em;
      margin-left: 3rem;
      height: 3em;
      min-width: 8em;
      padding: .3em .6em;
      border: 3px solid #fff;
      border-radius: .5rem;
      font-family: inherit;
      font-size: inherit;
      text-decoration: none;
      color: var(--blue);
      background: var(--green);
      cursor: pointer;
    }

    button:last-of-type {
      margin-left: 0;
      margin-right: 3rem;
    }
  }
}

/* 2. CSS Overflow */
@layer overflow {
  div {
    display: flex;
    overflow: auto;
  }
}

/* 3. CSS Snap Points */
@layer snap {
  div {
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scrollbar-width: none;
  }
}

/* 4. CSS Scroll Buttons */
@layer scroll-buttons {
  @supports selector(::scroll-button(*)) {
    div {
      anchor-name: --carrousel;
    }

    div::scroll-button(*) {
      font-size: 1rem;
      opacity: 0.7;
      white-space: nowrap;
      margin-bottom: 1em;
      height: 3em;
      min-width: 8em;
      padding: .3em .6em;
      border: 3px solid #fff;
      border-radius: .5rem;
      font-family: inherit;
      font-size: inherit;
      text-decoration: none;
      color: var(--blue);
      background: var(--green);
      cursor: pointer;
    }

    div::scroll-button(*):hover,
    div::scroll-button(*):focus {
      opacity: 1;
    }

    div::scroll-button(*):active {
      translate: 1px 1px;
    }

    div::scroll-button(*):disabled {
      opacity: 0.2;
      cursor: unset;
    }
    div::scroll-button(left) {
      content: "← Vorige";
    }

    div::scroll-button(right) {
      content: "Volgende →";
    }

    div::scroll-button(*) {
      position: absolute;
      position-anchor: --carrousel;
    }

    div::scroll-button(left) {
      right: calc(anchor(left) - 170px);
      bottom: 3rem;
    }

    div::scroll-button(right) {
      left: calc(anchor(right) - 190px);
      bottom: 3rem;
    }
    
    button {
      display:none;
    }

    footer {
      justify-content:center;
      padding-bottom:3rem;
    }
  }
}

/* 5. CSS Scroll-Driven Animations */
@layer scroll-animations {
  blockquote {
    animation: scaleIn linear both;
    animation-range: 0% 50%;
    animation-timeline: view(inline);
  }
  
  @keyframes scaleIn {
    0% {
      scale:.6;
    }
    100% {
      scale:1;
    }
  }
}


    
</style>
  