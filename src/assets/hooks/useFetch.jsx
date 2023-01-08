import React, { useEffect, useState } from 'react';

const useFetch = (URL) => {
	const [jobs, setJobs] = useState([]);
	const [url, setUrl] = useState(URL);

	useEffect(() => {
		fetch(url, { headers: { 'Content-Type': 'application/json' } })
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
	}, [url]);
	return [jobs, url, setUrl];
};

export default useFetch;
