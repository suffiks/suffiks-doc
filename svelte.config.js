import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";
import tailwind from "tailwindcss";
import autoprefixer from "autoprefixer";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: {
			plugins: [tailwind, autoprefixer],
		},
	}),

	kit: {
		adapter: adapter(),
	},

	vite: {
		optimizeDeps: { include: ["mermaid"] },
	},
};

export default config;
