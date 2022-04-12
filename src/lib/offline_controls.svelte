<script lang="ts">
	import { browser } from "$app/env";
	import { onDestroy, onMount } from "svelte";
	import Switch from "./layout/switch.svelte";

	let enable_offline = true;
	let was = enable_offline;

	let online = true;
	let canBeOffline = false;

	let error: string | null;

	if (browser) {
		enable_offline = localStorage.getItem("enable_offline") === "1";
		online = navigator.onLine;
		canBeOffline = !!navigator.serviceWorker && !!navigator.serviceWorker.controller;

		const lsWatch = (e: StorageEvent) => {
			if (e.key === "enable_offline") {
				enable_offline = e.newValue === "1";
			}
		};

		const onlineWatch = (_e: Event) => {
			online = navigator.onLine;
		};

		const serviceWorkerWatch = (_e: Event) => {
			canBeOffline = !!navigator.serviceWorker && !!navigator.serviceWorker.controller;
		};

		onMount(() => {
			window.addEventListener("storage", lsWatch);
			window.addEventListener("online", onlineWatch);

			if (navigator.serviceWorker) {
				navigator.serviceWorker.addEventListener("controllerchange", serviceWorkerWatch);
			}
		});
		onDestroy(() => {
			window.removeEventListener("storage", lsWatch);
			window.removeEventListener("online", onlineWatch);

			if (navigator.serviceWorker) {
				navigator.serviceWorker.removeEventListener("controllerchange", serviceWorkerWatch);
			}
		});
	}

	const registerOfflineSupport = async () => {
		console.log("REGISTER");
		if (
			!navigator.serviceWorker.controller ||
			navigator.serviceWorker.controller.state !== "activated"
		) {
			error = "Service worker not activated";
			return;
		}
		const registration = (await navigator.serviceWorker.ready) as any;

		try {
			console.log("Enabled offline support");
			await registration.periodicSync.register("sync-offline", {
				minInterval: 24 * 60 * 60 * 1000,
			});
			error = null;
		} catch (e) {
			console.log(e);
			error = e.message;
		}
	};

	const unregisterOfflineSupport = async () => {
		const registration = (await navigator.serviceWorker.ready) as any;

		try {
			console.log("Disabled offline support");
			await registration.periodicSync.unregister("sync-offline");
			error = null;
		} catch (e) {
			console.log(e);
			error = e.message;
		}
	};

	$: (() => {
		if (enable_offline === was || !canBeOffline) {
			return;
		}
		was = enable_offline;
		if (enable_offline) {
			registerOfflineSupport();
		} else {
			unregisterOfflineSupport();
		}
	})();
</script>

{#if canBeOffline}
	<hr class="my-3 opacity-25" />
	<Switch id="is_offline" text="Offline support" bind:checked={enable_offline} disabled={!online} />
	{#if error}
		<p class="mt-2 text-red-400">
			{error}
		</p>
	{/if}
	{#if !online}
		<p class="opacity-50 mt-2">
			You are currently offline and browsing a cached version of the documentation.
		</p>
	{/if}
{/if}
