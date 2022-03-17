<script>
	import Sidebar from "$lib/layout/sidebar.svelte";
	import Topbar from "$lib/layout/topbar.svelte";

	import "../app.css";
</script>

<Topbar />
<div class="md:container flex items-stretch w-full">
	<div class="min-w-fit mr-8">
		<Sidebar />
	</div>
	<div class="w-full overflow-x-clip">
		<slot />
	</div>
</div>
