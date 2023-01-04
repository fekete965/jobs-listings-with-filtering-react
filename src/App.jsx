import React, { useEffect, useState } from 'react';
import { GlobalStyle } from './globalStyles';
import { SMain } from './assets/components/Main/MainStyles';
import Header from './assets/components/Header/Header';
import Job from './assets/components/Job/Job';

function App() {
	const [jobs, setJobs] = useState([]);
	const URL = `http://localhost:3000/data`;

	useEffect(() => {
		fetch(URL)
			.then((res) => res.json())
			.then((data) => {
				const modifiedJobs = data.map((job) => {
					return {
						...job,
						logo: `/src/assets/${job.logo.slice(1)}`
					};
				});
				setJobs(modifiedJobs);
			})
			.catch((err) => console.log(err));
	}, []);

	return (
		<div className='App'>
			<GlobalStyle />
			<Header />
			<SMain>
				{jobs ? jobs.map((job) => <Job key={job.id} {...{ ...job }} />) : console.log(Array.isArray(jobs))}
				<Job />
			</SMain>
		</div>
	);
}

export default App;
