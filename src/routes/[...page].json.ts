// This endpoint takes the all available content, strips the markdown and returns it as a json object with a permalink.

import {
	get as getCache,
	type Categories,
	type Category,
	type Group,
	type Page,
} from "$lib/content";
import type { RequestHandler } from "@sveltejs/kit";
import { remark } from "remark";
import strip from "strip-markdown";

async function stripContent(content: string) {
	return (await remark().use(strip).process(content)).value;
}

// function onePath(content : Categories, document: string) {
// 	const page = content[0];

// 	return twoPaths(page.index, document);
// }

// function twoPaths(groupSlug: string, documentSlug: string) {
// 	return threePaths(content.index, groupSlug, documentSlug);
// }

// function threePaths(pageSlug: string, groupSlug: string, documentSlug: string) {
// 	const page = content.pages.find((p) => p.slug == pageSlug);
// 	const group = page.groups.find((g) => g.slug == groupSlug);
// 	const doc = group.documents.find((d) => d.slug == documentSlug);

// 	return {
// 		props: {
// 			doc,
// 		},
// 	};
// }

const notFound = {
	status: 404,
};

/** @type {import('./index.json').RequestHandler} */
export const get: RequestHandler = async ({ params }) => {
	const content = await getCache();
	if (params.page == "") {
		const c = content[0];
		const g = c.groups[0];
		const p = g.pages[0];

		return {
			status: 200,
			body: {
				redirect: true,
				location: `/${c.slug}/${g.slug}/${p.slug}`,
			},
		};
	}
	const parts = params.page.split("/");

	if (parts.length > 3 || parts.length == 0) {
		return notFound;
	}

	let page: Page;
	switch (parts.length) {
		case 1:
			page = content[0].groups[0].pages.find((p) => p.slug == parts[0]);
			break;
		case 2:
			page = content[0].groups
				.find((g) => g.slug == parts[0])
				.pages.find((p) => p.slug == parts[1]);
			break;
		case 3:
			page = content
				.find((p) => p.slug == parts[0])
				.groups.find((g) => g.slug == parts[1])
				.pages.find((p) => p.slug == parts[2]);
			break;
		default:
			return notFound;
	}

	if (!page) {
		return notFound;
	}

	return {
		status: 200,
		headers: {
			"content-type": "application/json",
		},
		body: {
			title: page.title,
			body: page.body,
		},
	};
};
