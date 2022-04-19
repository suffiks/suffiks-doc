<script context="module" lang="ts">
	import Admonition from "$lib/markdown/renderers/admonition.svelte";
	import Paragraph from "$lib/markdown/renderers/paragraph.svelte";
	import CodeSpan from "$lib/markdown/renderers/codespan.svelte";
	import Text from "$lib/markdown/renderers/text.svelte";
	import Heading from "$lib/markdown/renderers/heading.svelte";
	import Table from "svelte-markdown/src/renderers/Table.svelte";
	import TableHead from "svelte-markdown/src/renderers/TableHead.svelte";
	import TableRow from "svelte-markdown/src/renderers/TableRow.svelte";
	import TCell from "svelte-markdown/src/renderers/TableCell.svelte";
	import TableBody from "svelte-markdown/src/renderers/TableBody.svelte";
	import List from "svelte-markdown/src/renderers/List.svelte";
	import ListItem from "svelte-markdown/src/renderers/ListItem.svelte";
	import Code from "svelte-markdown/src/renderers/Code.svelte";
	import Link from "svelte-markdown/src/renderers/Link.svelte";
	import Strong from "svelte-markdown/src/renderers/Strong.svelte";

	const renderers = {
		paragraph: Paragraph,
		heading: Heading,
		table: Table,
		tablehead: TableHead,
		tablerow: TableRow,
		tablecell: TCell,
		tablebody: TableBody,
		list: List,
		listitem: ListItem,
		code: Code,
		codespan: CodeSpan,
		text: Text,
		link: Link,
		admonition: Admonition,
		strong: Strong,
	};
</script>

<script lang="ts">
	import type { TableCell, Token } from "$lib/markdown/converter";
	import { supressWarnings } from "svelte-markdown/src/supress-warnings";

	supressWarnings();

	export let tokens: Token[] = [];

	export let type: string = "";
	export let ordered: boolean = false;
	export let rows: TableCell[][] = [];
	export let header: TableCell[] = [];
</script>

{#if type == ""}
	{#each tokens as token}
		<svelte:self {...token} />
	{/each}
{:else if renderers[type]}
	{#if type === "table"}
		<svelte:component this={renderers.table}>
			<svelte:component this={renderers.tablehead}>
				<svelte:component this={renderers.tablerow}>
					{#each header as headerItem, i}
						<svelte:component
							this={renderers.tablecell}
							header={true}
							align={$$restProps.align[i] || "center"}
						>
							<svelte:self tokens={headerItem.tokens} />
						</svelte:component>
					{/each}
				</svelte:component>
			</svelte:component>
			<svelte:component this={renderers.tablebody}>
				{#each rows as row}
					<svelte:component this={renderers.tablerow}>
						{#each row as cells, i}
							<svelte:component
								this={renderers.tablecell}
								header={false}
								align={$$restProps.align[i] || "center"}
							>
								<svelte:self tokens={cells.tokens} />
							</svelte:component>
						{/each}
					</svelte:component>
				{/each}
			</svelte:component>
		</svelte:component>
	{:else if type === "list"}
		{#if ordered}
			<svelte:component this={renderers.list} {ordered} {...$$restProps}>
				{#each $$restProps.items as item}
					<svelte:component this={renderers.listitem} {...item}>
						<svelte:self tokens={item.tokens} />
					</svelte:component>
				{/each}
			</svelte:component>
		{:else}
			<svelte:component this={renderers.list} {ordered} {...$$restProps}>
				{#each $$restProps.items as item}
					<svelte:component this={renderers.listitem} {...item}>
						<svelte:self tokens={item.tokens} />
					</svelte:component>
				{/each}
			</svelte:component>
		{/if}
	{:else}
		<svelte:component this={renderers[type]} {...$$restProps}>
			{#if tokens && tokens.length > 0}
				<svelte:self {tokens} />
			{:else}
				{$$restProps.raw || $$restProps.text}
			{/if}
		</svelte:component>
	{/if}
{/if}
