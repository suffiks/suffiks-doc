import MiniSearch from "minisearch";

export function newIndex() {
	return new MiniSearch({
		fields: ["title", "content"],
		idField: "permalink",
		storeFields: ["title", "content"],
		searchOptions: {
			boost: {
				title: 2,
			},
			prefix: true,
			fuzzy: 0.2,
			weights: {
				prefix: 0.6,
				fuzzy: 0.4,
			},
		},
	});
}

export async function initSearch(
	fetch: (info: RequestInfo, init?: RequestInit) => Promise<Response>,
	index: MiniSearch,
) {
	await fetch("/content.json")
		.then((r) => r.json())
		.then(async (data) => {
			await index.addAllAsync(data);
		});
}
