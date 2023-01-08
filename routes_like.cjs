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

		if (req.query.languages_like) {
			let languages = req.query.languages_like;

			if (Array.isArray(languages)) {
				jobs = jobs.filter((job) => languages.every((language) => job.languages.some((jobLanguage) => jobLanguage.includes(language))));
			} else if (typeof languages === 'string') {
				jobs = jobs.filter((job) => job.languages.some((jobLanguage) => jobLanguage.includes(languages)));
			}
		}

		res.json(jobs);
	});
	next();
};
