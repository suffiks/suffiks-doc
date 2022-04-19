import { Lexer, Slugger, marked } from "marked";

interface TextOrToken {
	text?: string;
	tokens?: Token[];
}

const admonitionTokenizerExtension = {
	name: "admonition",
	level: <const>"block",
	start(src: string) {
		return src.match(/!!!\s*\w+/)?.index;
	},
	tokenizer(this: marked.TokenizerThis, src: string, tokens: marked.Token[]) {
		let rule = /(?:^)!!! ?([\w\-]+(?: +[\w\-]+)*)(?: +"(.*?)")? *(?:\n)(.*?)\n!!!/;
		const match = rule.exec(src);
		if (match) {
			return {
				type: "admonition",
				raw: match[0],
				kind: match[1],
				title: match[2],
				text: match[3],
			} as MarkedAdmonitionToken;
		}
	},
};

marked.use({ extensions: [admonitionTokenizerExtension] });
// marked.setOptions(…)
const options = marked.defaults;

options.baseUrl = null;
options.breaks = false;
options.gfm = true;
options.headerIds = true;
options.headerPrefix = "";
options.highlight = null;
options.langPrefix = "language-";
options.mangle = true;
options.pedantic = false;
options.renderer = null;
options.sanitize = false;
options.sanitizer = null;
options.silent = false;
options.smartLists = false;
options.smartypants = true;
options.tokenizer = null;
options.xhtml = false;

export function convert(src: string): Token[] {
	const lexer = new Lexer(options);
	const tokens = lexer.lex(src);
	const slugger = new Slugger();

	return tokens.map(converToken(slugger)).filter((t) => t.type != "space");
}

function cleanInlineTokens(slugger: marked.Slugger, tokens: marked.Token[], def = ""): TextOrToken {
	if (!tokens) {
		return {
			text: def,
		};
	}
	let ret = tokens.map(converToken(slugger));

	if (ret.length == 1 && ret[0].type == "text") {
		return {
			text: ret[0].text,
		};
	}
	return {
		tokens: ret,
	};
}

function converToken(slugger: marked.Slugger, log = false): (token: marked.Token) => Token {
	return (markedToken: marked.Token) => {
		const token = markedToken as marked.Token | MarkedAdmonitionToken;

		if (log) {
			console.log(token.type);
		}
		switch (token.type) {
			case "heading":
				return {
					type: "heading",
					depth: token.depth,
					slug: slugger.slug(token.text),
					...cleanInlineTokens(slugger, token.tokens),
				} as Heading;
			case "space":
				return {
					type: "space",
				} as Space;
			case "code":
				return {
					type: "code",
					text: token.text,
					codeBlockStyle: token.codeBlockStyle,
					lang: token.lang,
				} as Code;
			case "table":
				return {
					type: "table",
					align: token.align,
					header: token.header.map(
						(t) =>
							({
								text: t.text,
							} as TableCell),
					),
					rows: token.rows.map((r) =>
						r.map(
							(c) =>
								({
									text: c.text,
								} as TableCell),
						),
					),
				} as Table;
			case "hr":
				return {
					type: "hr",
				} as Hr;
			case "blockquote":
				return {
					type: "blockquote",
					text: token.text,
				} as Blockquote;
			case "list":
				return {
					type: "list",
					ordered: token.ordered,
					start: token.start,
					items: token.items.map((i) => {
						return {
							type: i.type,
							task: i.task,
							checked: i.checked,
							loose: i.loose,
							tokens: i.tokens.map(converToken(slugger, true)),
						} as ListItem;
					}),
				} as List;
			case "list_item":
				return {
					type: token.type,
					task: token.task,
					checked: token.checked,
					loose: token.loose,
					tokens: token.tokens.map(converToken(slugger)),
				} as ListItem;
			case "paragraph":
				return {
					type: "paragraph",
					pre: token.pre,
					...cleanInlineTokens(slugger, token.tokens),
				} as Paragraph;
			case "html":
				return {
					type: "html",
					text: token.text,
				} as HTML;
			case "text":
				return {
					type: "text",
					...cleanInlineTokens(slugger, (token as marked.Tokens.Text).tokens, token.text),
				} as Text;
			case "def":
				return {
					type: "def",
					tag: token.tag,
					href: token.href,
					title: token.title,
				} as Def;
			case "escape":
				return {
					type: "escape",
					text: token.text,
				} as Escape;
			case "link":
				return {
					type: "link",
					href: token.href,
					title: token.title,
					text: token.text,
				} as Link;
			case "image":
				return {
					type: "image",
					href: token.href,
					title: token.title,
					text: token.text,
				} as Image;
			case "strong":
				return {
					type: "strong",
					text: token.text,
				} as Strong;
			case "em":
				return {
					type: "em",
					text: token.text,
				} as Em;
			case "codespan":
				return {
					type: "codespan",
					text: token.raw,
				} as Codespan;
			case "br":
				return {
					type: "br",
				} as Br;
			case "del":
				return {
					type: "del",
					text: token.text,
				} as Del;
			case "admonition":
				return {
					type: "admonition",
					title: token.title,
					text: token.text,
					kind: token.kind,
				} as Admonition;
			default:
				const t = token as any;
				if (t?.type) {
					console.warn(`Unknown token type: ${t.type}`);
				} else {
					console.warn(`Unknown token type: ${token}`);
				}
		}
	};
}

export type Token =
	| Space
	| Code
	| Heading
	| Table
	| Hr
	| Blockquote
	| List
	| ListItem
	| Paragraph
	| HTML
	| Text
	| Def
	| Escape
	| Tag
	| Image
	| Link
	| Strong
	| Em
	| Codespan
	| Br
	| Del
	| Admonition;

export interface Space {
	type: "space";
}

export interface Code {
	type: "code";
	codeBlockStyle?: "indented" | undefined;
	lang?: string | undefined;
	text: string;
}

export interface Heading {
	type: "heading";
	depth: number;
	text: string;
	slug: string;
	tokens: Token[];
}

export interface Table {
	type: "table";
	align: Array<"center" | "left" | "right" | null>;
	header: TableCell[];
	rows: TableCell[][];
}

export interface TableCell {
	text: string;
	tokens: Token[];
}

export interface Hr {
	type: "hr";
}

export interface Blockquote {
	type: "blockquote";
	text: string;
}

export interface List {
	type: "list";
	ordered: boolean;
	start: number | "";
	loose: boolean;
	items: ListItem[];
}

export interface ListItem {
	type: "list_item";
	task: boolean;
	checked?: boolean | undefined;
	loose: boolean;
	tokens: Token[];
}

export interface Paragraph {
	type: "paragraph";
	pre?: boolean | undefined;
	text: string;
}

export interface HTML {
	type: "html";
	pre: boolean;
	text: string;
}

export interface Text {
	type: "text";
	text: string;
}

export interface Def {
	type: "def";
	tag: string;
	href: string;
	title: string;
}

export interface Escape {
	type: "escape";
	text: string;
}

export interface Tag {
	type: "text" | "html";
	inLink: boolean;
	text: string;
}

export interface Link {
	type: "link";
	href: string;
	title: string;
	text: string;
}

export interface Image {
	type: "image";
	href: string;
	title: string;
	text: string;
}

export interface Strong {
	type: "strong";
	text: string;
}

export interface Em {
	type: "em";
	text: string;
}

export interface Codespan {
	type: "codespan";
	text: string;
}

export interface Br {
	type: "br";
}

export interface Del {
	type: "del";
	text: string;
}

export interface Admonition {
	type: "admonition";
	kind: string;
	title: string;
	text: string;
}

interface MarkedAdmonitionToken {
	type: "admonition";
	raw: string;
	kind: string;
	title: string;
	text: string;
}
