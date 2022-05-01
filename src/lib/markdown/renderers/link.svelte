<script lang="ts">
	export let destination: string = "";
	export let title: string | undefined = undefined;
</script>

<a href={destination} {title}><slot /></a>
