<script context="module" lang="ts">
	const renderers = {
		Heading: Heading,
		Text: Text,
		Paragraph: Paragraph,
		CodeSpan: Codespan,
		CodeBlock: Codeblock,
		Link: Link,
		List: List,
		ListItem: ListItem,
		Admonition: Admonition,
	};
</script>

<script lang="ts">
	import type { Token } from "$lib/content";
	import List from "./renderers/list.svelte";
	import ListItem from "./renderers/list_item.svelte";
	import Codeblock from "./renderers/codeblock.svelte";
	import Codespan from "./renderers/codespan.svelte";
	import Heading from "./renderers/heading.svelte";
	import Link from "./renderers/link.svelte";
	import Paragraph from "./renderers/paragraph.svelte";
	import Text from "./renderers/text.svelte";
	import Admonition from "./renderers/admonition.svelte";

	// import { supressWarnings } from "svelte-markdown/src/supress-warnings";
	// supressWarnings();

	export let tokens: Token[] = [];
	export let kind: string = "";
	if (kind && !renderers[kind]) {
		console.warn(`Unknown kind: ${kind}`);
	}
</script>

{#if kind == ""}
	{#each tokens as token}
		<svelte:self {...token} />
	{/each}
{:else if renderers[kind]}
	<svelte:component this={renderers[kind]} {...$$restProps}>
		{#if tokens && tokens.length > 0}
			<svelte:self {tokens} />
		{/if}
	</svelte:component>
{/if}
