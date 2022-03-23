interface Params {
	alt?: boolean;
	control?: boolean;
	shift?: boolean;
	code?: string;
	callback?: (node: any) => void;
}

export type { Params };

export const shortcut = (node: any, params: Params) => {
	let handler: (this: Window, ev: KeyboardEvent) => any;

	const removeHandler = () => window.removeEventListener("keydown", handler);
	const setHandler = () => {
		removeHandler();
		if (!params) return;
		handler = (e) => {
			if (
				!!params.alt != e.altKey ||
				!!params.shift != e.shiftKey ||
				!!params.control != (e.ctrlKey || e.metaKey) ||
				params.code != e.code
			)
				return;
			e.preventDefault();
			params.callback ? params.callback(node) : node.click();
		};
		window.addEventListener("keydown", handler);
	};
	setHandler();
	return {
		update: setHandler,
		destroy: removeHandler,
	};
};
