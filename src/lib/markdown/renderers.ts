import AdmonitionMarkdown from "$lib/markdown/admonition.svelte";
import Paragraph from "$lib/markdown/paragraph.svelte";
import Heading from "$lib/markdown/heading.svelte";

export const base = {
	paragraph: Paragraph,
	heading: Heading,
};

export const renderers = {
	...base,
	admonition: AdmonitionMarkdown,
};
