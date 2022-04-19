<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";
	export const load: Load = async ({ params, fetch }) => {
		const req = await fetch("/" + params.page + ".json");

		const doc = await req.json();
		if (doc.redirect) {
			return {
				status: 302,
				redirect: doc.location,
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
	import Markdown from "$lib/markdown.svelte";
	import type { Token } from "$lib/markdown/converter";

	let body: Token[];
	export let doc;

	$: {
		body = doc.body;
	}
</script>

<svelte:head>
	<title>{doc?.title}</title>
</svelte:head>

<div class="md prose-zink max-w-none prose lg:prose-xl dark:prose-invert">
	<Markdown source={body} />
</div>
