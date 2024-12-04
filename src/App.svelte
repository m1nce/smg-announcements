<script>
  import IntroLogo from './IntroLogo.svelte';
  import Terminal from './Terminal.svelte';
  import Welcome from './Welcome.svelte';
  import WeeklyEvents from './WeeklyEvents.svelte';
  import Community from './Community.svelte';

  let showTerminal = false; // Controls terminal visibility
  let introCompleted = false; // Tracks whether IntroLogo has finished
  let showWelcome = false; // Controls announcement visibility
  let showWeeklyEvents = false; // Controls weekly events visibility
  let showCommunity = false;

  function showTerminalOnClick() {
    if (introCompleted && !showWelcome && !showWeeklyEvents && !showCommunity) { 
      // Only show the terminal if the intro is completed and welcome screen is not active
      showTerminal = true;
    }
  }

  function handleIntroCompleted() {
    introCompleted = true; // Set the flag when IntroLogo animation finishes
  }

  function handleTerminalHide() {
    showTerminal = false; // Hide terminal
    showWelcome = true; // Show announcements
  }

  function handleWelcomeDone() {
    showWelcome = false; 
    showWeeklyEvents = true;
  }

  function handleWeeklyEventsDone() {
    showWeeklyEvents = false;
    showCommunity = true;
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
      position: relative;
      z-index: 0; /* Ensure it does doesn't interfere with child stacking */
      overflow: visible; /* Prevent clipping of child elements */
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
    <Welcome on:done={handleWelcomeDone} />
  {/if}

  {#if showWeeklyEvents}
    <!-- Render the Weekly Events -->
    <WeeklyEvents on:done={handleWeeklyEventsDone} />
  {/if}

  {#if showCommunity}
    <Community />
  {/if}
</div>