import AdmonitionMarkdown from "$lib/markdown/admonition.svelte";
import Paragraph from "$lib/markdown/paragraph.svelte";
import Heading from "$lib/markdown/heading.svelte";
import Code from "$lib/markdown/code.svelte";

export const base = {
	paragraph: Paragraph,
	heading: Heading,
	code: Code, // TODO(thokra): Add support for mermaid code blocks
};

export const renderers = {
	...base,
	admonition: AdmonitionMarkdown,
};
