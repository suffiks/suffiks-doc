<script lang="ts">
	export let tight = false;
</script>

{#if tight}
	<slot />
{:else}
	<p><slot /></p>
{/if}
