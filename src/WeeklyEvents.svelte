<script>
    let terminalContent = `(base) smg@macbook smg-announcements % python
  Python 3.12.2 | packaged by conda-forge | (main, Feb 16 2024, 20:54:21) [Clang 16.0.6 ] on darwin
  Type "help", "copyright", "credits" or "license" for more information.\n>>> `; // Pre-existing Python information
    const commands = [
      'import cv2',
      'import os',
      'def display_pngs(folder_path):',
      '    for filename in os.listdir(folder_path):',
      '        if filename.endswith(".png"):',
      '            img_path = os.path.join(folder_path, filename)',
      '            img = cv2.imread(img_path)',
      '            cv2.imshow(filename, img)',
      '            cv2.waitKey(0)',
      '            cv2.destroyAllWindows()',
      'folder_path = "./Events"',
      'display_pngs(folder_path)',
    ]; // Commands to simulate typing
    let typingIndex = 0; // Tracks the current command being typed
    let charIndex = 0; // Tracks the character within the current command
    const typingDelay = 50; // Delay between typing each character
    const lineDelay = 500; // Delay between commands
  
    // Start typing commands after component mounts
    $: if (typingIndex === 0) {
      typeNextCommand();
    }
  
    function typeNextCommand() {
      if (typingIndex < commands.length) {
        const command = commands[typingIndex];
        typeCharacters(command, charIndex);
      }
    }
  
    function typeCharacters(command, index) {
      if (index < command.length) {
        terminalContent += command[index]; // Add one character at a time
        charIndex++;
        setTimeout(() => typeCharacters(command, charIndex), typingDelay); // Continue typing
      } else {
        // Command is fully typed
        terminalContent += '\n>>> '; // Add new Python prompt
        typingIndex++;
        charIndex = 0; // Reset character index for the next command
        setTimeout(typeNextCommand, lineDelay); // Delay before typing the next command
      }
    }
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
        <p>{terminalContent}</p>
    </div>
</div>
  