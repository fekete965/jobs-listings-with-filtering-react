const server = require('json-server').create();

module.exports = (req, res, next) => {
	server.get('/data', (req, res) => {
		let jobs = [
			{
				id: 1,
				company: 'Acme Inc',
				position: 'Software Engineer',
				tools: ['Vue', 'RoR'],
				languages: ['JavaScript', 'Ruby']
			},
			{
				id: 2,
				company: 'Acme Inc',
				position: 'Data Scientist',
				tools: ['Django', 'Sass'],
				languages: ['Python', 'R']
			},
			{
				id: 3,
				company: 'Big Corp',
				position: 'Software Engineer',
				languages: ['HTML', 'JavaScript'],
				tools: ['Sass']
			}
		];

		// Filter jobs by tools if the `tools` query param is present
		if (req.query.tools) {
			const tools = req.query.tools.split(','); // Split the value of the `tools` query param into an array
			jobs = jobs.filter((job) => job.tools.some((tool) => tools.includes(tool))); // Keep only jobs that have at least one tool in the `tools` array
		}

		// Filter jobs by languages if the `languages` query param is present
		if (req.query.languages) {
			const languages = req.query.languages.split(','); // Split the value of the `languages` query param into an array
			jobs = jobs.filter((job) => job.languages.some((language) => languages.includes(language))); // Keep only jobs that have at least one language in the `languages` array
		}

		res.json(jobs);
	});
	next();
};
