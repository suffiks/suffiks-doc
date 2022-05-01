export interface Token {
	type: string;
	tokens: Token[];
}

export interface Page {
	permalink: string;
	title: string;
	slug: string;
	document: Token;
}

export interface Group {
	name: string;
	slug: string;
	pages: Page[];
}

export interface Category {
	name: string;
	slug: string;
	groups: Group[];
}

export interface ErrorResponse {
	error: string;
}

export type Categories = Category[];

const cacheDuration = 1000 * 60 * 5; // 5 minutes;
class DocCache {
	url: string;

	cacheTime = 0;
	cache: Categories | ErrorResponse;

	constructor() {
		let apiURL = process.env.VITE_API_URL;
		if (!apiURL) {
			apiURL = import.meta.env.VITE_API_URL;
		}

		this.url = apiURL;
	}

	public async get(force?: boolean): Promise<Categories | ErrorResponse> {
		if (this.cacheTime + cacheDuration > Date.now() && this.cache && !force) {
			return this.cache;
		}

		console.log("Fetching content from", this.url);

		let json: Categories | ErrorResponse;
		try {
			const response = await fetch(this.url);
			json = await response.json();
			// json.forEach((c) => {
			// 	c.groups.forEach((g) => {
			// 		g.pages.forEach((p) => {
			// 			p.body = convert(p.body);
			// 		});
			// 	});
			// });
		} catch (e) {
			console.error(e);
			json = { error: e.message };
		}
		this.cache = json;
		this.cacheTime = Date.now();
		return json;
	}
}

const cache = new DocCache();

export async function get(force?: boolean): Promise<Categories | ErrorResponse> {
	return await cache.get(force);
}
