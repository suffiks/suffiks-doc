<script lang="ts">
	export let level: number;
	export let slug = "";
</script>

{#if level === 1}
	<h1 id={slug} class="group">
		<slot />
		<a href="#{slug}" class="group-hover:visible">¶</a>
	</h1>
{:else if level === 2}
	<h2 id={slug}>
		<slot />
		<a href="#{slug}" class="group-hover:visible">¶</a>
	</h2>
{:else if level === 3}
	<h3 id={slug}>
		<slot />
		<a href="#{slug}" class="group-hover:visible">¶</a>
	</h3>
{:else if level === 4}
	<h4 id={slug}>
		<slot />
		<a href="#{slug}" class="group-hover:visible">¶</a>
	</h4>
{:else if level === 5}
	<h5 id={slug}>
		<slot />
		<a href="#{slug}" class="group-hover:visible">¶</a>
	</h5>
{:else if level === 6}
	<h6 id={slug}>
		<slot />
		<a href="#{slug}" class="group-hover:visible">¶</a>
	</h6>
{/if}

<style lang="postcss">
	a {
		@apply align-top invisible;
		font-size: 0.5em;
	}

	a[href="#"] {
		display: none;
	}
</style>
