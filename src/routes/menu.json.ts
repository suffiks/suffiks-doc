// This endpoint takes the all available content, strips the markdown and returns it as a json object with a permalink.

import { get as getCache } from "$lib/content";
import type { RequestHandler } from "@sveltejs/kit";
import { remark } from "remark";
import strip from "strip-markdown";

async function stripContent(content: string) {
	return (await remark().use(strip).process(content)).value;
}

/** @type {import('./menu.json').RequestHandler} */
export const get: RequestHandler = async ({}) => {
	const ret = [];
	const content = await getCache();

	for (const page of content) {
		let c = {
			name: page.name,
			slug: page.slug,
			groups: [],
		};
		for (const group of page.groups) {
			let g = {
				name: group.name,
				slug: group.slug,
				pages: [],
			};
			for (const doc of group.pages) {
				g.pages.push({
					permalink: `/${page.slug}/${group.slug}/${doc.slug}`,
					title: doc.title,
				});
			}
			c.groups.push(g);
		}
		ret.push(c);
	}

	return {
		status: 200,
		headers: {
			"content-type": "application/json",
		},
		body: ret,
	};
};
