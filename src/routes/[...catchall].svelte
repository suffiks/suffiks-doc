<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import content from "$lib/content";

	function onePath(document: string) {
		const page = content.pages.find((p) => p.slug == content.index);

		return twoPaths(page.index, document);
	}

	function twoPaths(groupSlug: string, documentSlug: string) {
		return threePaths(content.index, groupSlug, documentSlug);
	}

	function threePaths(pageSlug: string, groupSlug: string, documentSlug: string) {
		const page = content.pages.find((p) => p.slug == pageSlug);
		const group = page.groups.find((g) => g.slug == groupSlug);
		const doc = group.documents.find((d) => d.slug == documentSlug);

		return {
			props: {
				doc,
			},
		};
	}

	export const load: Load = async ({ url }) => {
		const parts = url.pathname.split("/").filter((p) => p != "");

		switch (parts.length) {
			case 1:
				return onePath(parts[0]);
			case 2:
				return twoPaths(parts[0], parts[1]);
			case 3:
				return threePaths(parts[0], parts[1], parts[2]);
			default:
				return {
					status: 404,
					html: "Not found",
				};
		}
	};
</script>

<script lang="ts">
	import Markdown from "$lib/markdown.svelte";
	import type { Document } from "$lib/content";

	export let doc: Document;
</script>

<svelte:head>
	<title>{doc.title}</title>
</svelte:head>

<div class="md prose-zink max-w-none prose lg:prose-xl dark:prose-invert">
	<h1>{doc.title}</h1>
	<!-- <SvelteMarkdown source={doc.content} {renderers} /> -->

	<Markdown source={doc.content} />
</div>
