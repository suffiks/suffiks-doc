const plugin = require("tailwindcss/plugin");

// Custom plugin to add support to style the active state of links
const linkactive = plugin(({ addVariant, e }) => {
	addVariant("linkactive", ({ modifySelectors, separator }) => {
		modifySelectors(({ className }) => {
			const newClass = e(`linkactive${separator}${className}`);
			return `a.active.${newClass}`;
		});
	});
});

module.exports = {
	content: ["./src/**/*.{html,js,svelte,ts}"],
	theme: {
		extend: {},
	},
	plugins: [linkactive, require("@tailwindcss/typography")],
};
