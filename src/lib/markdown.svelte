<script lang="ts">
	import type { Token } from "$lib/content";
	import MarkdownRenderer from "./markdown/markdown_renderer.svelte";

	export let source: Token[];
</script>

<MarkdownRenderer tokens={source} />

<!--
{#each source as token}
	{#if token.type == "paragraph"}
		<Paragraph text={token.text} />
	{:else if token.type == "heading"}
		<Heading depth={token.depth} slug={token.slug}>
			{token.text}
		</Heading>
	{:else if token.type != "space"}
		<h1 style="color:red; font-size:72px;">Missing {token.type}</h1>
	{/if}
{/each} -->
