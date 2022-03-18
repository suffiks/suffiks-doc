const testContent = `# Changing teams

This section applies when you get the following error when deploying:

> "tobac.nais.io" denied the request: user 'system:serviceaccount:default:serviceuser-MYTEAM' has no access to team 'OTHERTEAM'

To change which team owns an application you must use \`kubectl\` and change the team label for the application. Deploying with the new team will not work if there exists an Application with the old team label set.

The easiest way to do this is with this one-liner. The user running the command must be a member of both the old and new team.

!!! warning
    Windows users: this one-liner will not work. Try the alternate method below.

\`\`\`text
kubectl patch app MYAPPLICATION --type merge --patch '{"metadata":{"labels":{"team":"MYTEAM"}}}'
\`\`\`

Alternate version: run the following command, and change the \`.metadata.labels.team\` field to the new team.

\`\`\`text
kubectl edit app MYAPPLICATION
\`\`\`
`;

export interface Document {
	slug: string;
	title: string;
	content: string;
}

export interface Group {
	name: string;
	slug: string;
	documents: Array<Document>;
}

export interface Page {
	slug: string;
	title: string;
	index: string;
	groups: Array<Group>;
}

export interface Content {
	index: string;
	pages: Array<Page>;
}

const content: Content = {
	index: "suffiks",
	pages: [
		{
			slug: "suffiks",
			title: "Suffiks",
			index: "start",
			groups: [
				{
					name: "Getting started",
					slug: "start",
					documents: [
						{
							slug: "install",
							title: "Install",
							content: testContent,
						},
						{
							slug: "application",
							title: "Application",
							content: testContent,
						},
					],
				},
			],
		},
	],
};

export default content;
