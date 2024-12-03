<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher(); // Create an event dispatcher

	let animationStarted = false; // Trigger the first animation
	let moveAndShrink = false; // Trigger the second animation after the first
	let introCompleted = false; // Track when the intro animation has completed

	onMount(() => {
		animationStarted = true;

		// Start the "move and shrink" animation after the reveal finishes
		setTimeout(() => {
			moveAndShrink = true;

			// Notify parent that the animation is complete
			setTimeout(() => {
				introCompleted = true; // Set introCompleted to true
				dispatch('completed'); // Emit a 'completed' event
			}, 3000); // Matches the duration of the "move and shrink" animation
		}, 6000); // Delay matches the reveal animation duration (5s + 1s delay)
	});
</script>

<style>
	/* Wrapper with a white background */
	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		width: 100vw;
		background-color: #fff;
		overflow: hidden;
		position: relative;
		z-index: 10; /* Ensure wrapper stays above other elements */
		transition: all 0.5s ease; /* Smooth transition */
	}

	.wrapper.shrink-wrapper {
		height: auto; /* Let content flow naturally */
		width: auto;
		background-color: transparent;
		overflow: visible; /* Allow child content to remain visible */
		position: relative; /* Reset positioning */
	}

	.container {
		position: relative;
		width: 20vmin; /* Dynamically size the image based on viewport width */
		height: 20vmin; /* Maintain aspect ratio */
		transition: transform 3s ease; /* Smooth transition for moving and shrinking */
		transform: translateY(0) scale(1); /* Initial position and size */
	}

	/* Add class to move and shrink the container */
	.container.shrink {
		transform: translateY(-45vh) scale(0.3); /* Move up relative to viewport height and shrink */
	}

	/* Grayscale image (always fully visible) */
	.grayscale-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	/* Color image (revealed via the mask) */
	.color-image {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		clip-path: circle(0% at 50% 50%); /* Start fully hidden */
		animation: reveal 5s linear forwards; /* Reveal animation */
		animation-delay: 2s; /* Delay before the animation starts */
	}

	/* Keyframes for clockwise reveal */
	@keyframes reveal {
		0% {
			clip-path: circle(0% at 50% 50%); /* Start hidden */
		}
		100% {
			clip-path: circle(150% at 50% 50%); /* Fully revealed */
		}
	}
</style>

<div class="wrapper {introCompleted ? 'shrink-wrapper' : ''}">
	<div class="container {moveAndShrink ? 'shrink' : ''}">
		<!-- Grayscale image -->
		<img
			src="/images/grey_smg.png"
			alt="SMG Greyscale Logo"
			class="grayscale-image"
		/>
		<!-- Color image -->
		<img
			src="/images/smg_logo.png"
			alt="SMG Logo"
			class="color-image {animationStarted ? 'revealed' : ''}"
		/>
	</div>
</div>
