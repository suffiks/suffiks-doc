<script>
	export let text;
</script>

{#if text}
	{text}
{/if}
<slot />
