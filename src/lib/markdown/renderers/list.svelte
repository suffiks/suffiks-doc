<script lang="ts">
	export let tight: boolean = false;
</script>

{#if tight}
	<slot />
{:else}
	<p><slot /></p>
{/if}
