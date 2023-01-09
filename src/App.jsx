import React, { useEffect, useState } from 'react';
import { GlobalStyle } from './globalStyles';
import { SMain } from './assets/components/Main/MainStyles';
import Header from './assets/components/Header/Header';
import Job from './assets/components/Job/Job';
import useFetch from './assets/hooks/useFetch';
import Filters from './assets/components/Filters/Filters';

function App() {
	const [jobs, setJobs, url, setUrl] = useFetch('http://localhost:3000/jobs');
	const [showFilters, setShowFilters] = useState(false);
	const [params, setParams] = useState({
		role: null,
		level: null,
		languages: new Set(),
		tools: new Set()
	});

	return (
		<div className='App'>
			<GlobalStyle />
			<Header />
			<SMain>
				{showFilters ? <Filters url={url} setUrl={setUrl} params={params} setParams={setParams} setShowFilters={setShowFilters} /> : null}
				{jobs ? jobs.map((job) => <Job key={job.id} {...job} url={url} setUrl={setUrl} showFilters={showFilters} setShowFilters={setShowFilters} params={params} setParams={setParams} />) : null}
				<Job />
			</SMain>
		</div>
	);
}

export default App;
