const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('data.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.get('/data', (req, res) => {
	res.jsonp(req.query);
});

server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
	if (req.method === 'POST') {
		req.body.createdAt = Date.now();
	}
	next();
});

server.use(router);
server.listen(3000, () => {
	console.log('JSON Server is running');
});

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

		if (req.query.tools) {
			let tools = req.query.tools;
			if (typeof tools === 'string') tools = [tools];
		}
		jobs = jobs.filter((job) => job.tools.every((tool) => tools.includes(tool)));

		if (req.query.languages) {
			let languages = req.query.languages;
			if (Array.isArray(languages)) {
				if (languages.length > 1) {
					jobs = jobs.filter((job) => languages.every((language) => job.languages.includes(language)));
				} else {
					jobs = jobs.filter((job) => job.languages.includes(languages[0]));
				}
			} else if (typeof languages === 'string') {
				languages = [languages];
				jobs = jobs.filter((job) => languages.some((language) => job.languages.includes(language)));
			}
		}

		res.json(jobs);
	});
	next();
};
