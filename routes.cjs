const server = require('json-server').create();

module.exports = (req, res, next) => {
	server.get('/data', (req, res) => {
		let jobs = [
			{
				id: 1,
				company: 'Photosnap',
				logo: './images/photosnap.svg',
				new: true,
				featured: true,
				position: 'Senior Frontend Developer',
				role: 'Frontend',
				level: 'Senior',
				postedAt: '1d ago',
				contract: 'Full Time',
				location: 'USA Only',
				languages: ['HTML', 'CSS', 'JavaScript'],
				tools: []
			},
			{
				id: 2,
				company: 'Manage',
				logo: './images/manage.svg',
				new: true,
				featured: true,
				position: 'Fullstack Developer',
				role: 'Fullstack',
				level: 'Midweight',
				postedAt: '1d ago',
				contract: 'Part Time',
				location: 'Remote',
				languages: ['Python'],
				tools: ['React']
			},
			{
				id: 3,
				company: 'Account',
				logo: './images/account.svg',
				new: true,
				featured: false,
				position: 'Junior Frontend Developer',
				role: 'Frontend',
				level: 'Junior',
				postedAt: '2d ago',
				contract: 'Part Time',
				location: 'USA Only',
				languages: ['JavaScript'],
				tools: ['React', 'Sass']
			}
		];

		// Filter jobs by tools if the `tools` query param is present
		if (req.query.tools) {
			let tools = req.query.tools;
			if (typeof tools === 'string') tools = [tools];
		}
		jobs = jobs.filter((job) => job.tools.some((tool) => tools.includes(tool)));

		// Filter jobs by languages if the `languages` query param is present
		if (req.query.languages) {
			let languages = req.query.languages;
			if (typeof languages === 'string') {
				languages = [languages];
			}
			jobs = jobs.filter((job) => languages.some((language) => job.languages.includes(language)));
		}

		res.json(jobs);
	});
	next();
};
