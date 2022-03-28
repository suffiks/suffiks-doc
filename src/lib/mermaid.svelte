<script lang="ts">
	import mermaid from "mermaid";
	import { onMount } from "svelte";

	export let source: string;
	let container: HTMLDivElement;

	onMount(() => {
		mermaid.initialize({
			theme: "neutral",
		});
		mermaid.render("graph-div", source, (svgCode) => {
			container.innerHTML = svgCode;
		});
	});
</script>

<div class="aspect-auto w-full flex justify-center" bind:this={container} />
