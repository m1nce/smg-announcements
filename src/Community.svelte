<script>
    import { onMount } from "svelte";
    import { createEventDispatcher } from "svelte";
  
    const dispatch = createEventDispatcher(); // Create a dispatcher
  
    // State variables
    let typedContent = ""; // Terminal content
    let showTerminal = true; // Controls terminal visibility
    let showImages = false; // Controls image container visibility
    let showText = false; // Controls text visibility
    let hideContent = false; // Controls whether images and text should be hidden
    let showExtraImage = false; // Controls extra image visibility
    let visibleImages = []; // Tracks images currently displayed
    let newImage = null; // The extra image to display after clicking the text
  
    // Constants
    const images = ["images/week9gm.jpg", "images/week10witnessing.jpg", "images/week8mp.jpg"]; // Image paths
    const extraImagePath = "images/hcc.png"; // Path to the new image
    const typingDelay = 10; // Typing speed per character
    const lineDelay = 300; // Delay between commands
    const terminalCloseDelay = 2000; // Delay before closing terminal
    const imageDisplayDelay = 1000; // Delay between displaying images (in milliseconds)
  
    // Commands for terminal simulation
    const commands = [
      "python",
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
  
    // Helper to check if a command is indented
    const isIndented = (command) => command.startsWith("    ");
  
    // Typing simulation
    const typeNextCommand = () => {
      if (typingIndex < commands.length) {
        const command = commands[typingIndex];
        const prompt =
          typingIndex === 0
            ? "(base) smg@macbook smg-announcements % "
            : isIndented(command)
            ? "... "
            : ">>> ";
        typedContent += prompt;
        typeCharacters(command, 0);
      }
    };
  
    const typeCharacters = (command, index) => {
      if (index < command.length) {
        typedContent += command[index];
        charIndex++;
        setTimeout(() => typeCharacters(command, charIndex), typingDelay);
      } else {
        typedContent += "\n";
        if (typingIndex === 0) {
          typedContent +=
            "Python 3.12.2 | packaged by conda-forge | (main, Feb 16 2024, 20:54:21) [Clang 16.0.6 ] on darwin\n" +
            'Type "help", "copyright", "credits" or "license" for more information.\n';
        }
        if (typingIndex < commands.length - 1) {
          typingIndex++;
          charIndex = 0;
          setTimeout(typeNextCommand, lineDelay);
        } else {
          setTimeout(closeTerminal, terminalCloseDelay);
        }
      }
    };
  
    // Close terminal and start image display
    const closeTerminal = () => {
      showTerminal = false;
      startImageDisplay();
    };
  
    // Progressive image display logic
    const startImageDisplay = () => {
      showImages = true;
  
      const displayNextImage = (index) => {
        if (index < images.length) {
          visibleImages = [...visibleImages, images[index]]; // Add the next image
          console.log("Displaying image:", images[index]); // Debugging
          setTimeout(() => displayNextImage(index + 1), imageDisplayDelay); // Delay for the next image
        } else {
          console.log("All images displayed.");
          setTimeout(() => {
            showText = true; // Show text after all images
          }, imageDisplayDelay);
        }
      };
  
      console.log("Starting image display...");
      displayNextImage(0);
    };
  
    // Handle text click to hide content and show the extra image
    const handleTextClick = () => {
      console.log("Text clicked. Hiding content...");
      hideContent = true; // Hide images and text
      setTimeout(() => {
        console.log("Displaying extra image.");
        newImage = extraImagePath; // Display the extra image
      }, 500); // Delay for smooth fade-out
    };
  
    onMount(() => {
      console.log("Starting terminal simulation...");
      setTimeout(typeNextCommand, 1000);
    });
  
    function finishEvents() {
      dispatch('done');
      console.log('done')
    }
  </script>
  
  <style>
    .weekly-events {
      position: absolute;
      top: 10%;
      left: 10%;
      width: 80%;
      height: 60%;
      text-align: left;
    }
  
    .terminal {
      background-color: #1e1e1e;
      color: #fff;
      font-family: monospace;
      padding: 10px;
      margin: 20px auto;
      width: 80%;
      height: 80%;
      border-radius: 8px;
    }
  
    .terminal-header {
      display: flex;
      align-items: center;
      height: 30px;
      background-color: #2e2e2e;
      padding: 0 10px;
    }
  
    .terminal-buttons {
      display: flex;
      gap: 6px;
    }
  
    .terminal-button {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }
  
    .terminal-button {
      background-color: #f25f57;
    }
  
    .terminal-button.yellow {
      background-color: #f2c14e;
    }
  
    .terminal-button.green {
      background-color: #3ba55c;
    }
  
    .image-container {
      display: grid;
      grid-template-areas:
        "image0 image1"
        "image2 text";
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      position: relative;
      justify-content: center;
      align-items: start;
      max-width: 90%;
      margin: auto;
      padding: 20px;
    }
  
    .image-container img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
      object-fit: contain;
      opacity: 0;
      transition: opacity 1s ease-in;
    }
  
    .image-container img.visible {
      opacity: 1;
    }
  
    .image-text {
      grid-area: text;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      color: #ccc;
      font-size: 1.2rem;
      line-height: 1.6;
      padding: 20px;
      opacity: 0;
      transition: opacity 1s ease-in;
    }
  
    .image-text.visible {
      opacity: 1;
    }
  
    .image-text ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
  
    .image-text ul > li {
      margin-bottom: 12px;
    }
  
    .image-text ul > li > ul {
      margin-left: 20px;
      list-style-type: disc;
    }
  
    .image-text ul > li > ul > li {
      font-size: 1rem;
      color: #bbb;
    }
  
    .extra-image-container {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 20px auto;
      width: 80%;
      max-width: 90%;
    }
  
    .extra-image-container img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  
    .hidden {
      opacity: 0;
      pointer-events: none;
    }
  </style>
  
  <div class="weekly-events">
    <!-- Terminal -->
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
          <pre>{typedContent}</pre>
        </div>
      </div>
    {/if}
  
    <!-- Image Container -->
    {#if showImages && !hideContent}
      <div class="image-container">
        {#each visibleImages as image, index}
          <img src="{image}" alt="Displayed Image" class={`image-${index} visible`} />
        {/each}
  
        <!-- Text in the bottom-right -->
        <div
          class="image-text {showText ? 'visible' : ''}"
          on:click={handleTextClick}
        >
          <ul>
            <li><strong>General Meeting</strong>: 7PM @ Center 119</li>
            <li><strong>Witnessing</strong>: 1 PM @ Jamba Juice
              <ul>
                <li>Led by Dasung and Athena on Tuesday</li>
                <li>Led by Christian and Liz on Wednesday</li>
              </ul>
            </li>
            <li><strong>Thursday Morning Prayer</strong>: 7 AM @ TapEx
              <ul>
                <li>Led by Ashley; praise by Annie and Esther</li>
              </ul>
            </li>
            <li><strong>Geth</strong>: Rides leave by 7:20 (sign up by Wed night)</li>
          </ul>
        </div>
      </div>
    {/if}
  
    <!-- Extra Image Container -->
    {#if newImage}
      <div class="extra-image-container" on:click={finishEvents}>
        <img src="{newImage}" alt="Extra Image" />
      </div>
    {/if}
  </div>