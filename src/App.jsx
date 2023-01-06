import React, { useEffect, useState } from 'react';
import { GlobalStyle } from './globalStyles';
import { SMain } from './assets/components/Main/MainStyles';
import Header from './assets/components/Header/Header';
import Job from './assets/components/Job/Job';
import useFetch from './assets/hooks/useFetch';
import Filters from './assets/components/Filters/Filters';

function App() {
	const [jobs, url, setUrl] = useFetch('http://localhost:3000/data');
	const [showFilters, setShowFilters] = useState(false);
	const [filterObject, setFilter] = useState({
		role: null,
		level: null,
		languages: new Set(),
		tools: new Set()
	});
	// console.log(filterObject);

	return (
		<div className='App'>
			<GlobalStyle />
			<Header />
			<SMain>
				{showFilters ? <Filters url={url} setUrl={setUrl} filterObject={filterObject} setFilter={setFilter} setShowFilters={setShowFilters} /> : null}
				{jobs ? jobs.map((job) => <Job key={job.id} {...job} url={url} setUrl={setUrl} showFilters={showFilters} setShowFilters={setShowFilters} filterObject={filterObject} setFilter={setFilter} />) : null}
				<Job />
			</SMain>
		</div>
	);
}

export default App;
