<script lang="ts">
	import Link from "$lib/link.svelte";
	import Searchbar from "$lib/searchbar.svelte";

	interface Page {
		title: string;
		permalink: string;
	}
	export let pages: Page[];
</script>

<div class="container flex justify-between py-4">
	<a href="/" class="text-lg font-semibold hover:text-purple-300">Suffiks</a>
	<Searchbar />
	<nav class="flex gap-3 items-center">
		{#each pages as page}
			<Link href={page.permalink} class="hover:text-purple-300">{page.title}</Link>
		{/each}
	</nav>
</div>
