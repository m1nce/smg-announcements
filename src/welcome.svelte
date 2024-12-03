<script>
    let showImage = true; // Controls image visibility
    let showReplacement = false; // Controls terminal visibility with replacement content
    let terminalContent = `Last login: Tues Dec 3 12:10:57 on ttys001\n(base) smg@macbook ~ $ git clone https://github.com/m1nce/smg-announcements.git\nCloning into 'smg-announcements'...\nremote: Enumerating objects: 3, done.\nremote: Counting objects: 100% (3/3), done.\nremote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0\n(base) smg@macbook ~ $ cd smg-announcements\n(base) smg@macbook ~ $ bash intro.sh\n(base) smg@macbook ~ $ `; // Initial terminal content

    const finalCommand = `cat question_of_the_week.txt`; // New command to type
    const question = `
The question of the week is: 
What's something you're looking forward to this winter break?\n`;

    const bulletPoints = [
        "- HCC ($400 SO CHEAP)",
        "- Family!",
        "- FOOD",
        "- Winter retreats and Jesus",
        "- Hong Kong and no school",
        "- Taiwan and skiing",
        "- Seeing Christmas lights"
    ]; // List of bullet points

    let typingIndex = 0; // Tracks typing character position
    const typingDelay = 50; // Delay between each character in milliseconds
    const questionDelay = 1000; // Delay before showing the question
    const bulletDelay = 500; // Delay between each bullet point

    function hideImage() {
        showImage = false; // Hide the image
        showReplacement = true; // Show the terminal replacement
        setTimeout(() => {
            typeFinalCommand(); // Start typing the final command
        }, 1000); // Delay before typing starts
    }

    function typeFinalCommand() {
        if (typingIndex < finalCommand.length) {
            // Add one character at a time
            terminalContent += finalCommand[typingIndex];
            typingIndex++;
            setTimeout(typeFinalCommand, typingDelay); // Continue typing
        } else {
            // Final command is fully typed, add a new line and display the question with a delay
            terminalContent += `\n`;
            setTimeout(() => {
                terminalContent += question; // Append the question
                typeBulletPoints(); // Start displaying bullet points
            }, questionDelay);
        }
    }

    function typeBulletPoints(index = 0) {
        if (index < bulletPoints.length) {
            setTimeout(() => {
                terminalContent += `\n${bulletPoints[index]}`; // Add each bullet point with a delay
                typeBulletPoints(index + 1); // Move to the next bullet point
            }, bulletDelay);
        } else {
            // After all bullet points, show the terminal prompt
            setTimeout(() => {
                terminalContent += `\n(base) smg@macbook ~ $ `;
            }, bulletDelay);
        }
    }
</script>

<style>
    .announcements {
        position: absolute;
        top: 15%;
        left: 10%;
        width: 80%;
        height: 60%;
        text-align: center;
        opacity: 0; /* Start fully hidden */
        animation: fadeIn 0.3s ease forwards; /* Apply animation */
        animation-delay: 1s; /* Set delay before fade-in starts */
        font-family: 'Poppins', sans-serif;
    }

    h {
        font-weight: bold;
        font-size: 48px;
        color: #2f7c0e;
        animation: fadeIn 0.3s ease forwards;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }

    .terminal {
        position: absolute;
        top: 10%;
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

<div class="announcements">
    <h>
        🎄🌱 WEEK 10 ANNOUNCEMENTS 🌱🎄
    </h>

    <br><br><br>

    {#if showImage}
        <!-- Render the image only if showImage is true -->
        <img src="/images/intro.jpg" alt="intro" width="25%" on:click={hideImage} />
    {/if}

    {#if showReplacement}
        <!-- Render terminal content when showReplacement is true -->
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
</div>
