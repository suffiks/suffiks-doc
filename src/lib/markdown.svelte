<script lang="ts">
	import SvelteMarkdown from "svelte-markdown";
	import { renderers } from "$lib/markdown/renderers";

	import { marked } from "marked";

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

	export let source: string;
</script>

<SvelteMarkdown {source} {options} {renderers} />
