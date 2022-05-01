<script lang="ts">
	export let language = "";
	export let text: string;
</script>

<pre class={language}><code>{text}<slot /></code></pre>
