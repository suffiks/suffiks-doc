<script lang="ts">
	import Link from "$lib/link.svelte";

	interface Page {
		title: string;
		permalink: string;
	}

	interface Group {
		name: string;
		pages: Page[];
	}

	interface Page {
		name: string;
		slug: string;
		groups: Group[];
	}

	type Menu = Page[];

	export let menu: Menu;
	const page = menu[0];
</script>

<ul>
	{#each page.groups as grp}
		<li class="">
			<h5 class="font-semibold text-slate-900 dark:text-slate-200">{grp.name}</h5>
			<ul>
				{#each grp.pages as page}
					<li>
						<Link
							class=" text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 linkactive:text-red-400"
							href={page.permalink}
						>
							{page.title}
						</Link>
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ul>
