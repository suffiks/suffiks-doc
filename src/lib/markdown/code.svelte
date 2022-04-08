<script lang="ts">
	import { browser } from "$app/env";
	import Mermaid from "$lib/mermaid.svelte";

	export let lang: string;
	export let text: string;
</script>

{#if lang == "mermaid"}
	<Mermaid source={text} />
{:else}
	<pre class={lang}><code>{text}</code></pre>
{/if}
