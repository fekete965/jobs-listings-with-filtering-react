import React, { useEffect, useState } from 'react';

const useFetch = () => {
	const [jobs, setJobs] = useState([]);
	const [url, setUrl] = useState(`http://localhost:3000/data`);

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
				setJobs(modifiedJobs);
			})
			.catch((err) => console.log(err));
	}, [url]);

	return [jobs, url, setUrl];
	// need a function to change the URL

	/*
  1a)
  http://localhost:3000/data?role=Frontend
  1b)
  http://localhost:3000/data?level=Midweight
  2)
  http://localhost:3000/data?q=languages:JavaScript,languages:CSS

  if more, just add to the array
  */
};

export default useFetch;
