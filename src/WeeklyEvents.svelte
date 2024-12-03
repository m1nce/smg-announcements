<script>
  import { onMount } from "svelte";

  let typedContent = `(base) smg@macbook smg-announcements % python
Python 3.12.2 | packaged by conda-forge | (main, Feb 16 2024, 20:54:21) [Clang 16.0.6 ] on darwin
Type "help", "copyright", "credits" or "license" for more information.\n>>> `;

  const commands = [
    "import cv2",
    "import os",
    "def display_pngs(folder_path):",
    "    for filename in os.listdir(folder_path):",
    "        if filename.endswith('.png'):",
    "            img_path = os.path.join(folder_path, filename)",
    "            img = cv2.imread(img_path)",
    "            cv2.imshow(filename, img)",
    "            cv2.waitKey(0)",
    "            cv2.destroyAllWindows()",
    "folder_path = './Events'",
    "display_pngs(folder_path)"
  ];

  let typingIndex = 0;
  let charIndex = 0;
  const typingDelay = 20; // Typing speed per character
  const lineDelay = 500; // Delay between lines
  const closeDelay = 2000; // Delay before closing terminal

  // Detect if a command is indented
  const isIndented = (command) => command.startsWith("    ");

  const typeNextCommand = () => {
    if (typingIndex < commands.length) {
      const command = commands[typingIndex];
      const prompt = isIndented(command) ? "... " : ">>> ";
      typedContent += prompt; // Add appropriate prompt
      typeCharacters(command, 0); // Type the command
    } else {
      // Terminal closing animation
      setTimeout(closeTerminal, closeDelay);
    }
  };

  const typeCharacters = (command, index) => {
    if (index < command.length) {
      typedContent += command[index]; // Add characters progressively
      charIndex++;
      setTimeout(() => typeCharacters(command, charIndex), typingDelay);
    } else {
      // When command typing finishes, add newline and prompt for next command
      typedContent += "\n";
      typingIndex++;
      charIndex = 0;
      setTimeout(typeNextCommand, lineDelay);
    }
  };

  const closeTerminal = () => {
    const terminal = document.querySelector(".terminal");
    terminal.style.opacity = 0; // Fade out animation
    setTimeout(() => {
      terminal.style.display = "none";
    }, 300);
  };

  onMount(() => {
    typeNextCommand();
  });
</script>


<style>
    .terminal {
        position: absolute;
        top: 15%;
        left: 10%;
        width: 80%;
        height: 80%;
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
        text-align: left;
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
    <pre>{typedContent}</pre>
  </div>
</div>
