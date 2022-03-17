<script lang="ts">
	import content from "$lib/content";
	import Link from "$lib/link.svelte";

	const page = content.pages[0];

	function path(grp, doc) {
		return `/${page.slug}/${grp.slug}/${doc.slug}`;
	}
</script>

<ul>
	{#each page.groups as grp}
		<li class="">
			<h5 class="font-semibold text-slate-900 dark:text-slate-200">{grp.name}</h5>
			<ul>
				{#each grp.documents as doc}
					<li>
						<Link
							class=" text-slate-700 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-300 linkactive:text-red-400"
							href={path(grp, doc)}
						>
							{doc.title}
						</Link>
					</li>
				{/each}
			</ul>
		</li>
	{/each}
</ul>
