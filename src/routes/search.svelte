<script context="module" lang="ts">
	import { initSearch, newIndex } from "$lib/search";

	import type { Load } from "@sveltejs/kit";

	const index = newIndex();

	export const load: Load = async ({ url, fetch }) => {
		const q = url.searchParams.get("q").trim();

		if (!q) {
			return {
				status: 302,
				redirect: "/",
			};
		}

		await initSearch(fetch, index);

		return {
			props: {
				res: index.search(q),
			},
		};
	};
</script>

<script lang="ts">
	export let res = [];
	$: console.log(res);
</script>

{#each res as result}
	{result.title}
{/each}
