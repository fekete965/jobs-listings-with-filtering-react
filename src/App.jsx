import React, { useEffect, useState } from 'react';
import { GlobalStyle } from './globalStyles';
import { SMain } from './assets/components/Main/MainStyles';
import Header from './assets/components/Header/Header';
import Job from './assets/components/Job/Job';
import useFetch from './assets/hooks/useFetch';

function App() {
	const [jobs, url, setUrl] = useFetch();

	// when a tag is clicked, jobs should be filtered to display objects containing the clicked tag's textContent

	return (
		<div className='App'>
			<GlobalStyle />
			<Header />
			<SMain>
				{jobs ? jobs.map((job) => <Job key={job.id} {...job} url={url} setUrl={setUrl} />) : null}
				<Job />
			</SMain>
		</div>
	);
}

export default App;
