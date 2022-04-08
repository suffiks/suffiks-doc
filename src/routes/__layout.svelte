<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async ({ fetch, url }) => {
		const req = await fetch("/menu.json");
		const menus = await req.json();

		const pages = [];
		for (let i = 1; i < menus.length; i++) {
			pages.push({
				title: menus[i].name,
				permalink: menus[i].groups[0].pages[0].permalink,
			});
		}

		let menu = menus[0];
		const parts = url.pathname.split("/");
		if (parts.length > 2) {
			menu = menus.find((m) => m.slug === parts[1]);
		}
		return {
			props: {
				pages,
				menu,
			},
		};
	};
</script>

<script lang="ts">
	import Sidebar from "$lib/layout/sidebar.svelte";
	import Topbar from "$lib/layout/topbar.svelte";

	import "../app.css";

	export let pages;
	export let menu;
</script>

<Topbar {pages} />
<div class="md:container flex items-stretch w-full pb-6">
	<div class="min-w-[180px] mr-8">
		<Sidebar {menu} />
	</div>
	<div class="w-full overflow-x-clip">
		<slot />
	</div>
</div>
