import React, { useEffect, useState } from 'react';

const useFetch = (URL) => {
	const [jobs, setJobs] = useState([]);
	const [url, setUrl] = useState(URL);

	useEffect(() => {
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				const modifiedJobs = data.map((job) => {
					return {
						...job,
						logo: `/src/assets/${job.logo.slice(1)}`
					};
				});
				// console.log(url);
				setJobs(modifiedJobs);
			})
			.catch((err) => console.log(err));
	}, [url]);
	return [jobs, url, setUrl];

	/*
  1a)
  http://localhost:3000/data?role=Frontend
  1b)
  http://localhost:3000/data?level=Midweight
  2)
  http://localhost:3000/data?languages[]=JavaScript
  !exclusively JavaScript
  3)
  http://localhost:3000/data?languages_like=JavaScript
  */
};

export default useFetch;
