<script>
  import { createEventDispatcher } from 'svelte';
  export let showTerminal = false; // Passed from parent
  const dispatch = createEventDispatcher();

  let terminalContent = `Last login: Tues Dec 3 12:10:57 on ttys001\n(base) smg@macbook ~ $ `; // Pre-filled content
  const commands = [
    `git clone https://github.com/m1nce/smg-announcements.git`,
    `cd smg-announcements`,
    `week10.sh`
  ]; // Commands to type sequentially
  let currentCommandIndex = 0; // Track the current command
  const typingDelay = 30; // Delay between each character (in ms)
  const startDelay = 750; // Delay before typing starts (in ms)
  const cloneOutput = `Cloning into 'smg-announcements'...
remote: Enumerating objects: 3, done.
remote: Counting objects: 100% (3/3), done.
remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0`; // Simulated output for cloning

  function typeCommand() {
    let typedText = '';
    const fullText = commands[currentCommandIndex];
    let index = 0;

    const interval = setInterval(() => {
      if (index < fullText.length) {
        typedText += fullText[index]; // Add one character at a time
        index++;
        terminalContent += fullText[index - 1]; // Update terminal content
      } else {
        clearInterval(interval); // Stop the interval once all text is typed

        if (currentCommandIndex === 0) {
          // Simulate cloning output after "git clone"
          setTimeout(() => {
            terminalContent += `\n${cloneOutput}\n(base) smg@macbook ~ $ `;
            currentCommandIndex++; // Move to the next command
            setTimeout(typeCommand, startDelay); // Start typing the next command
          }, 1000); // Delay before showing cloning output
        } else {
          currentCommandIndex++; // Move to the next command
          if (currentCommandIndex < commands.length) {
            // Add a newline and prefill prompt before typing the next command
            terminalContent += `\n(base) smg@macbook ~ $ `;
            setTimeout(typeCommand, startDelay); // Start typing the next command
          } else {
            // Notify parent that the terminal has finished
            setTimeout(() => {
              dispatch('hideTerminal'); // Dispatch event to hide the terminal
              console.log('Terminal finished typing commands');
            }, 1000); // Delay before dispatching the event
          }
        }
      }
    }, typingDelay);
  }

  // Start typing the first command after the terminal is shown
  $: if (showTerminal) {
    setTimeout(() => {
      typeCommand();
    }, startDelay);
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
        <span>{terminalContent}</span>
        <span class="cursor"></span>
      </p>
    </div>
  </div>
{/if}