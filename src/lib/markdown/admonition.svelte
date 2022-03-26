<script lang="ts">
	import SvelteMarkdown from "svelte-markdown";
	import { base as renderers } from "$lib/markdown/renderers";

	export let title: string;
	export let kind: string;
	export let text: string;

	let header = title;
	$: header = header || kind.replace(/^\w/, (c) => c.toUpperCase());
</script>

<div class={kind}>
	<h3>{header}</h3>
	<SvelteMarkdown source={text} {renderers} />
</div>

<style lang="postcss">
	div {
		@apply border-l-8 border
		border-gray-500
		p-4
		mt-2;
	}
	div.warning {
		@apply border-yellow-500;
	}
	div.info {
		@apply border-blue-400;
	}
	div.error {
		@apply border-red-500;
	}
	h3 {
		@apply text-xl
		font-bold
		mb-2 mt-1;
	}
	div > :global(p) {
		@apply mb-0;
	}
</style>
