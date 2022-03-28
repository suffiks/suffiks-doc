<script lang="ts">
	import { shortcut } from "$lib/shortcut";
	import { initSearch, newIndex } from "./search";

	const index = newIndex();

	let active = false;
	let inited = false;

	let showResults = false;
	let forceActive = true;
	let results = [];
	let value: string = "";
	let selected = 0;

	function controlSelection(e: KeyboardEvent) {
		switch (e.code) {
			case "ArrowDown":
				e.preventDefault();
				if (selected < results.length - 1) selected++;
				break;
			case "ArrowUp":
				e.preventDefault();
				if (selected > 0) selected--;
				break;
			case "Enter":
				e.preventDefault();
				if (results[selected]) {
					window.location.href = results[selected].id;
				}
				break;
		}
	}

	function search() {
		const res = index.search(value);
		showResults = res.length > 0;
		results = res;
	}

	$: if (active && !inited) {
		inited = true;
		initSearch(fetch, index);
	}

	$: if (!active && !forceActive) {
		results = [];
		showResults = false;
	}
</script>

<div>
	<form method="get" action="/search" class="relative isolate group" on:submit|preventDefault>
		<input
			type="search"
			name="q"
			placeholder="Search"
			bind:value
			on:keydown={controlSelection}
			on:keyup={search}
			on:focus={() => {
				active = true;
				search();
			}}
			on:blur={() => (active = false)}
			use:shortcut={{ control: true, code: "KeyK", callback: (node) => node.focus() }}
			class="bg-slate-800 border-slate-400 border px-4 py-2 focus:outline-none focus:shadow-outline w-96"
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

	<div class="result" class:hidden={!showResults} on:mouseenter={() => (forceActive = true)}>
		<ul>
			{#each results as r, index}
				<li>
					<a on:click={() => (forceActive = false)} href={r.id} class:focus={index == selected}>
						{r.title}
					</a>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style lang="postcss">
	.result {
		@apply absolute top-14 bg-slate-900 w-96 border border-gray-600 border-t-0;
	}

	.result a {
		@apply block p-3;
	}

	.result a.focus,
	.result a:hover,
	.result a:focus {
		@apply bg-purple-900;
	}
</style>
