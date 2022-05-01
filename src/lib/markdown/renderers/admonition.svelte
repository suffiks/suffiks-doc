<script lang="ts">
	export let title: string;
	export let level: string;

	let header = title;
	$: header = header || level.replace(/^\w/, (c) => c.toUpperCase());
</script>

<div class={level}>
	<h3>{header}</h3>
	<slot />
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
