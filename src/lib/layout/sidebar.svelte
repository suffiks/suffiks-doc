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

	interface Menu {
		name: string;
		slug: string;
		groups: Group[];
	}

	export let menu: Menu;
</script>

<ul>
	{#each menu.groups as grp}
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
