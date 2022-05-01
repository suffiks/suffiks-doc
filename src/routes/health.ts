/** @type {import('./index.json').RequestHandler} */
export async function get({}) {
	return {
		status: 200,
		body: "ok",
	};
}
