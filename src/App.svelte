<script>
  import IntroLogo from './intro_logo.svelte';
  import Terminal from './terminal.svelte';
  import Welcome from './welcome.svelte';

  let showTerminal = false; // Controls terminal visibility
  let introCompleted = false; // Tracks whether IntroLogo has finished
  let showWelcome = false; // Controls announcement visibility

  function showTerminalOnClick() {
    if (introCompleted) {
      showTerminal = true; // Show terminal only if IntroLogo has finished
    }
  }

  function handleIntroCompleted() {
    introCompleted = true; // Set the flag when IntroLogo animation finishes
  }

  function handleTerminalHide() {
    showTerminal = false; // Hide terminal
    showWelcome = true; // Show announcements
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
  <!-- IntroLogo is always rendered -->
  <IntroLogo on:completed={handleIntroCompleted} />

  {#if showTerminal}
    <!-- Render the Terminal -->
    <Terminal {showTerminal} on:hideTerminal={handleTerminalHide} />
  {/if}

  {#if showWelcome}
    <!-- Render the Welcome Screen -->
    <Welcome />
  {/if}
</div>