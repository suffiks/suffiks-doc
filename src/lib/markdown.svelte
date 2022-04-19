<script lang="ts">
	import type { Token } from "$lib/markdown/converter";

	import { marked } from "marked";
	import MarkdownRenderer from "./markdown/markdown_renderer.svelte";

	const admonitionTokenizerExtension = {
		name: "admonition",
		level: <const>"block",
		start(src: string) {
			return src.match(/!!!\s*\w+/)?.index;
		},
		tokenizer(this: marked.TokenizerThis, src: string, tokens: marked.Token[]) {
			let rule = /(?:^)!!! ?([\w\-]+(?: +[\w\-]+)*)(?: +"(.*?)")? *(?:\n)(.*?)\n!!!/;
			const match = rule.exec(src);
			if (match) {
				return {
					type: "admonition",
					raw: match[0],
					kind: match[1],
					title: match[2],
					text: match[3],
				};
			}
		},
	};

	marked.use({ extensions: [admonitionTokenizerExtension] });
	// marked.setOptions(…)
	const options = marked.defaults;

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
