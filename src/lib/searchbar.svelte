<script lang="ts">
	import { shortcut } from "$lib/shortcut";
	import { initSearch, newIndex } from "./search";

	const index = newIndex();

	let active = false;
	let inited = false;

	let value: string = "";

	function search() {
		const res = index.search(value);
		console.log(res);
	}

	$: if (active && !inited) {
		inited;
		initSearch(fetch, index);
	}
</script>

<div>
	<form method="get" action="/search" class="relative isolate group" on:submit|preventDefault>
		<input
			type="search"
			name="q"
			placeholder="Search"
			bind:value
			on:keyup={search}
			on:focus={() => (active = true)}
			on:blur={() => (active = false)}
			use:shortcut={{ control: true, code: "KeyK", callback: (node) => node.focus() }}
			class="bg-slate-800 border-slate-400 border rounded-md px-4 py-2 focus:outline-none focus:shadow-outline w-96"
		/>
		<kbd
			class="isscript font-sans font-semibold dark:text-slate-500 absolute right-3 top-2"
			class:hidden={active}
		>
			<abbr title="Control" class="no-underline text-slate-300 dark:text-slate-500">Ctrl</abbr>
			K
		</kbd>
		<button type="submit" class="hidden">Search</button>
	</form>
</div>
