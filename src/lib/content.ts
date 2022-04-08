export interface Page {
	permalink: string;
	title: string;
	slug: string;
	body: string;
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

export type Categories = Category[];

const cacheDuration = 1000 * 60 * 5; // 5 minutes;
class DocCache {
	url: string;

	cacheTime: number = 0;
	cache: Categories;

	constructor(url: string) {
		this.url = url;
	}

	public async get(force?: boolean) {
		if (this.cacheTime + cacheDuration > Date.now() && this.cache && !force) {
			return this.cache;
		}

		const response = await fetch(this.url);
		const json = await response.json();
		this.cache = json;
		this.cacheTime = Date.now();
		return json;
	}
}

const cache = new DocCache(`${import.meta.env.VITE_API_URL}/content.json`);

export async function get(force?: boolean): Promise<Categories> {
	return await cache.get(force || true);
}
