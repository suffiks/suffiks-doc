<script lang="ts">
	import type { Slugger } from "marked";

	import { getContext, getAllContexts } from "svelte";
	import { key } from "svelte-markdown/src/context";

	export let depth: number;
	export let raw: string;
	export let text: string;
	// export let slugger: Slugger;

	$: console.log(getAllContexts());
	$: console.log(key);
	$: console.log(getContext("::key;;"));

	$: id = text;
</script>

{#if depth === 1}
	<h1 {id} class="group">
		<slot />
		<a href="#{id}" class="group-hover:visible">¶</a>
	</h1>
{:else if depth === 2}
	<h2 {id}>
		<slot />
		<a href="#{id}" class="group-hover:visible">¶</a>
	</h2>
{:else if depth === 3}
	<h3 {id}>
		<slot />
		<a href="#{id}" class="group-hover:visible">¶</a>
	</h3>
{:else if depth === 4}
	<h4 {id}>
		<slot />
		<a href="#{id}" class="group-hover:visible">¶</a>
	</h4>
{:else if depth === 5}
	<h5 {id}>
		<slot />
		<a href="#{id}" class="group-hover:visible">¶</a>
	</h5>
{:else if depth === 6}
	<h6 {id}>
		<slot />
		<a href="#{id}" class="group-hover:visible">¶</a>
	</h6>
{:else}
	{raw}
{/if}

<style lang="postcss">
	a {
		@apply align-top invisible;
		font-size: 0.5em;
	}
</style>
