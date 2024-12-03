<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let showImage = true;
    let showReplacement = false;
    let terminalContent = `Last login: Tues Dec 3 12:10:57 on ttys001\n(base) smg@macbook ~ $ git clone https://github.com/m1nce/smg-announcements.git\nCloning into 'smg-announcements'...\nremote: Enumerating objects: 3, done.\nremote: Counting objects: 100% (3/3), done.\nremote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0\n(base) smg@macbook ~ $ cd smg-announcements\n(base) smg@macbook smg-announcements $ bash intro.sh\n(base) smg@macbook smg-announcements $ `;

    const finalCommand = `cat question_of_the_week.txt`;
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
    ];

    let typingIndex = 0;
    const typingDelay = 50;
    const questionDelay = 1000;
    const postQuestionDelay = 3000;
    const bulletDelay = 1000;
    let allowClear = false;
    let clearCommandIndex = 0;
    let showCursor = true;

    function hideImage() {
        showImage = false;
        showReplacement = true;
        setTimeout(() => {
            typeFinalCommand();
        }, 1000);
    }

    function typeFinalCommand() {
        if (typingIndex < finalCommand.length) {
            terminalContent += finalCommand[typingIndex];
            typingIndex++;
            setTimeout(typeFinalCommand, typingDelay);
        } else {
            terminalContent += `\n`;
            setTimeout(() => {
                terminalContent += question;
                setTimeout(() => {
                    typeBulletPoints();
                }, postQuestionDelay); // Delay specifically after showing the question
            }, questionDelay);
        }
    }

    function typeBulletPoints(index = 0) {
        if (index < bulletPoints.length) {
            setTimeout(() => {
                terminalContent += `\n${bulletPoints[index]}`;
                typeBulletPoints(index + 1);
            }, bulletDelay);
        } else {
            setTimeout(() => {
                terminalContent += `\n\n(base) smg@macbook ~ $ `;
                allowClear = true;
            }, bulletDelay);
        }
    }

    function clearTerminal() {
        if (allowClear) {
            typeClearCommand();
        }
    }
    
    function typeClearCommand() {
        const clearCommand = "clear"; // Command without the leading space
        if (clearCommandIndex === 0) {
            // Add the initial space before typing the command
            terminalContent += " ";
        }

        if (clearCommandIndex < clearCommand.length) {
            // Append the next character of "clear" to terminalContent
            terminalContent += clearCommand[clearCommandIndex];
            clearCommandIndex++;
            setTimeout(typeClearCommand, typingDelay);
        } else {
            // After typing the full command, clear the terminal
            setTimeout(() => {
                terminalContent = `(base) smg@macbook ~ $ `;
                clearCommandIndex = 0;
                allowClear = false;
                completeWelcome();
            }, 500);
        }
    }

    function completeWelcome() {
        dispatch('done');
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

<div class="announcements">
    <h>
        🎄🌱 WEEK 10 ANNOUNCEMENTS 🌱🎄
    </h>

    <br><br><br>

    {#if showImage}
        <!-- Render the image only if showImage is true -->
        <img src="images/intro.jpg" alt="intro" width="25%" on:click={hideImage} />
    {/if}

    {#if showReplacement}
        <!-- Render terminal content when showReplacement is true -->
        <div class="terminal" on:click={clearTerminal}>
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
