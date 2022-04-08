<script context="module" lang="ts">
	import type { Load } from "@sveltejs/kit";

	export const load: Load = async ({ fetch }) => {
		const req = await fetch("/menu.json");
		const menu = await req.json();

		return {
			props: {
				menu,
			},
		};
	};
</script>

<script lang="ts">
	import Sidebar from "$lib/layout/sidebar.svelte";
	import Topbar from "$lib/layout/topbar.svelte";

	import "../app.css";

	export let menu;
</script>

<Topbar />
<div class="md:container flex items-stretch w-full pb-6">
	<div class="min-w-[180px] mr-8">
		<Sidebar {menu} />
	</div>
	<div class="w-full overflow-x-clip">
		<slot />
	</div>
</div>
