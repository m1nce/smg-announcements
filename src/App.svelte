<script>
    import IntroLogo from './intro_logo.svelte';
    import Terminal from './terminal.svelte';
  
    let showTerminal = false; // Controls terminal visibility
    let introCompleted = false; // Tracks whether IntroLogo has finished
  
    function showTerminalOnClick() {
      if (introCompleted) {
        showTerminal = true; // Show terminal only if IntroLogo has finished
      }
    }
  
    function handleIntroCompleted() {
      introCompleted = true; // Set the flag when IntroLogo animation finishes
    }
  </script>
  
  <style>
    .app-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100vh;
      width: 100vw;
      background-color: #f0f0f0;
      cursor: pointer;
    }
  </style>
  
  <div class="app-wrapper" on:click={showTerminalOnClick}>
    <!-- Render the Intro Logo -->
    <IntroLogo on:completed={handleIntroCompleted} />
  
    <!-- Render the Terminal -->
    <Terminal {showTerminal} />
  </div>
  