<script lang="ts">
	import { page } from "$app/stores";

	export let href: string;
	let active = false;

	$: active = $page.url.pathname.includes(href);
</script>

<a {href} class:active {...$$restProps}>
	<slot />
</a>
