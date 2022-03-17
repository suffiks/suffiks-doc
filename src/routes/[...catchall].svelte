<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	import content from "$lib/content";

	export const load: Load = async ({ url }) => {
		const parts = url.pathname.split("/").filter((p) => p != "");
		if (parts.length > 3) {
			console.log(parts);
			return {
				status: 404,
				html: "Not found",
			};
		}

		const pageSlug = parts.length >= 1 ? parts[0] : false;
		const groupSlug = parts.length >= 2 ? parts[1] : false;
		const documentSlug = parts.length >= 3 ? parts[2] : false;

		const page = content.pages.find(
			(p) => (pageSlug && p.slug == pageSlug) || (!pageSlug && p.slug == content.index),
		);

		const group = page.groups.find(
			(g) => (groupSlug && g.slug == groupSlug) || (!groupSlug && g.slug == page.groups[0].slug),
		);

		const doc = group.documents?.find(
			(d) =>
				(documentSlug && d.slug == documentSlug) ||
				(!documentSlug && d.slug == group.documents[0].slug),
		);

		if (!doc) {
			return {
				status: 404,
				html: "Not found",
			};
		}

		if (parts.length != 3) {
			return {
				status: 302,
				redirect: `/${page.slug}/${group.slug}/${doc.slug}`,
			};
		}
		return {
			props: {
				doc,
			},
		};
	};
</script>

<script lang="ts">
	import SvelteMarkdown from "svelte-markdown";
	export let doc;
</script>

<svelte:head>
	<title>{doc.title}</title>
</svelte:head>

<h1>{doc.title}</h1>

<div class="md">
	<SvelteMarkdown source={doc.content} />
</div>

<style>
	:global .md p {
		color: red !important;
	}
</style>
