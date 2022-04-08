<script lang="ts">
	import mermaid from "mermaid/dist/mermaid.esm.min.mjs";
	import { onMount } from "svelte";

	export let source: string;
	let container: HTMLDivElement;

	onMount(() => {
		mermaid.initialize({
			startOnLoad: false,
			theme: "neutral",
		});
		mermaid.render("graph-div", source, (svgCode) => {
			container.innerHTML = svgCode;
		});
	});
</script>

<div class="aspect-auto w-full flex justify-center" bind:this={container} />
