<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	export const load: Load = async ({ params, fetch }) => {
		const req = await fetch("/" + params.catchall + ".json");
		return {
			props: {
				doc: await req.json(),
			},
		};
	};
</script>

<script lang="ts">
	import Markdown from "$lib/markdown.svelte";
	import SvelteMarkdown from "svelte-markdown";

	export let doc;
</script>

<svelte:head>
	<title>{doc?.title}</title>
</svelte:head>

<div class="md prose-zink max-w-none prose lg:prose-xl dark:prose-invert">
	<Markdown source={doc?.body} />
</div>
