// This endpoint takes the all available content, strips the markdown and returns it as a json object with a permalink.

import content from "$lib/content";
import { remark } from "remark";
import strip from "strip-markdown";

async function stripContent(content: string) {
	return (await remark().use(strip).process(content)).value;
}

/** @type {import('./index.json').RequestHandler} */
export async function get({}) {
	const ret = [];

	for (const page of content.pages) {
		for (const group of page.groups) {
			for (const doc of group.documents) {
				ret.push({
					permalink: `/${page.slug}/${group.slug}/${doc.slug}`,
					title: doc.title,
					content: await stripContent(doc.content),
				});
			}
		}
	}

	return {
		status: 200,
		headers: {
			"content-type": "application/json",
		},
		body: ret,
	};
}
