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
				q,
			},
		};
	};
</script>

<script lang="ts">
	export let q: string;
	export let res = [];
	$: console.log(res);
</script>

<h1 class="text-xl">
	Search results for <span class="opacity-70">{q}</span>
</h1>

{#each res as result}
	<ul>
		<li class="pt-5">
			<a href={result.id} class="group">
				<h2 class="text-xl group-hover:underline">{result.title}</h2>
				<p class="text-md">{result.content.substr(0, 150)}</p>
			</a>
		</li>
	</ul>
{/each}
