import { spawn } from 'child_process';
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import css from 'rollup-plugin-css-only';
import copy from 'rollup-plugin-copy';

const production = !process.env.ROLLUP_WATCH;

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/build/bundle.js',
	},
	plugins: [
		svelte({
			compilerOptions: {
				// Enable run-time checks when not in production
				dev: !production
			}
		}),
		// Extract component CSS into a separate file
		css({ output: 'bundle.css' }),

		// Resolve node modules
		resolve({
			browser: true,
			dedupe: ['svelte'],
		}),
		commonjs(),

		// Copy static assets (excluding `build` itself)
		copy({
			targets: [
				{ src: 'public/**/*', dest: 'build/', ignore: ['public/build/**'] }, // Prevent nested build
			],
		}),

		// Start a dev server in development mode
		!production && serve(),

		// Enable live reloading in development mode
		!production && livereload('build'),

		// Minify the output in production mode
		production && terser(),
	],
	watch: {
		clearScreen: false,
	},
};
