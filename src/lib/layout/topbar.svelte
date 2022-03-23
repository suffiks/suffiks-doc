<script>
	import Link from "$lib/link.svelte";
	import Searchbar from "$lib/searchbar.svelte";
</script>

<div class="container flex justify-between py-4">
	<a href="/" class="text-lg font-semibold hover:text-purple-300">Suffiks</a>
	<Searchbar />
	<nav class="flex gap-3 items-center">
		<Link href="/suffiks" class="hover:text-purple-300">About</Link>
		<Link href="/suffiks/extra" class="hover:text-purple-300">Extra</Link>
	</nav>
</div>
