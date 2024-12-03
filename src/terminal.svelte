<script>
  export let showTerminal = false; // Receive visibility state from parent

  let typedText = ''; // State for the typed content
  const preFilledText = `Last login: Tues Dec 3 12:10:57 on ttys001\n(base) smg@macbook ~ $ `; // Text already displayed
  const fullText = `git clone https://github.com/m1nce/smg-announcements.git`; // Text to be typed
  const typingDelay = 100; // Delay between each character (in ms)
  const startDelay = 500; // Delay before typing starts (in ms)

  function startTyping() {
    let index = 0;

    const interval = setInterval(() => {
      if (index < fullText.length) {
        typedText += fullText[index]; // Add one character at a time
        index++;
      } else {
        clearInterval(interval); // Stop the interval once all text is typed
      }
    }, typingDelay);
  }

  // Start typing after the terminal is shown
  $: if (showTerminal) {
    setTimeout(startTyping, startDelay); // Start typing with a delay
  }
</script>

<style>
  .terminal {
    position: absolute;
    top: 10%;
    left: 10%;
    width: 80%;
    height: 60%;
    background-color: #1e1e1e;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
    padding: 10px;
    display: flex;
    flex-direction: column;
    color: #fff;
    font-family: monospace;
    overflow: hidden;
    z-index: 10;
    animation: fadeIn 0.3s ease forwards;
    opacity: 0.5;
  }

  .terminal-header {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 30px;
    background-color: #2e2e2e;
    border-radius: 6px 6px 0 0;
    padding-left: 10px;
    color: #fff;
    font-size: 12px;
  }

  .terminal-buttons {
    display: flex;
    gap: 6px;
  }

  .terminal-button {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: #f25f57; /* Red for close */
    cursor: pointer;
  }

  .terminal-button.yellow {
    background-color: #f2c14e; /* Yellow for minimize */
  }

  .terminal-button.green {
    background-color: #3ba55c; /* Green for maximize */
  }

  .terminal-content {
    flex: 1;
    background-color: #1e1e1e;
    padding: 10px;
    font-size: 14px;
    overflow: auto;
    white-space: pre-wrap;
  }

  .terminal-content p {
    margin: 0.5px 0; /* Reduce vertical spacing */
    line-height: 1.2; /* Adjust line height for closer lines */
  }

  /* Blinking cursor */
  .cursor {
    display: inline-block;
    width: 8px;
    height: 16px;
    background-color: #fff;
    margin-left: 2px;
    animation: blink 0.8s step-start infinite;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes blink {
    50% {
      background-color: transparent;
    }
  }
</style>

{#if showTerminal}
  <div class="terminal">
    <div class="terminal-header">
      <div class="terminal-buttons">
        <div class="terminal-button"></div>
        <div class="terminal-button yellow"></div>
        <div class="terminal-button green"></div>
      </div>
      <span style="margin-left: 10px;">Terminal</span>
    </div>
    <div class="terminal-content">
      <p>
        <span>{preFilledText}</span>
        <span>{typedText}</span>
        <span class="cursor"></span>
      </p>
    </div>
  </div>
{/if}