import React, { useEffect, useState } from 'react';
import images from '../../images';
import { Tag } from '../Job/JobStyles';
import { ActiveFilter, ActiveFilters, Clear, CloseCon, Image, SFilters, FiltersCon } from './FiltersStyles';

const Filters = ({ showAll, role, level, languages, tools, url, setUrl, showFilters, setShowFilters, filterObject, setFilter }) => {
	const [count, setCount] = useState(0);

	useEffect(() => console.log(url));

	const updateSearchParams = (e) => {
		const key = e.target.dataset.prop;
		const value = e.target.textContent;

		console.log(key, value);

		const isPrimitive = (key) => key === 'role' || key === 'level';
		const isFirstFilter = (url) => url === 'http://localhost:3000/data';

		const url2 = new URL(url);
		console.table(url2.search.toString());

		if (url2.search.includes(value)) return;
		const newPrimitiveParam = new URLSearchParams({ [key]: value }).toString();
		const newComplexParam = new URLSearchParams({ [`${key}_like`]: value }).toString();

		let queryString = isFirstFilter(url) ? '?' : '&';

		isPrimitive(key) ? setUrl(`${url}${queryString}${newPrimitiveParam}`) : setUrl(`${url}${queryString}${newComplexParam}`);
	};

	const isSet = (object) => typeof object === 'object' && object?.constructor === Set;

	const addFilter = (e) => {
		const prop = e.target.dataset.prop;
		const value = e.target.textContent;

		if (isSet(filterObject[prop])) {
			setFilter({ ...filterObject, [prop]: new Set([...filterObject[prop], value]) });
		} else {
			setFilter({
				...filterObject,
				[prop]: value
			});
		}
	};

	const updateFilters = (e) => {
		setShowFilters(true);
		updateSearchParams(e);
		addFilter(e);
	};
	// !
	const removeFilters = (e) => {
		removeSearchParam(e);
		removeFilter(e);
		Object.values(filterObject).length === 0 ? setShowFilters(false) : null;
	};

	const removeSearchParam = (e) => {
		const currentUrl = new URL(url);
		const searchParams = new URLSearchParams(currentUrl.search);
		searchParams.delete(e.currentTarget.dataset.prop);

		currentUrl.search = searchParams.toString();
		setUrl(currentUrl.toString());
	};

	const removeFilter = (e) => {
		const filterObjCopy = filterObject;
		for (const key in filterObjCopy) {
			if (filterObjCopy[key] === e.target.textContent) delete filterObjCopy[key];
		}
		setFilter(filterObjCopy);

		setCount((prevCount) => prevCount - 1);
	};

	const renderActiveFilter = (val, i, key, isArray) => {
		if (!val) return null;
		return (
			<ActiveFilter onClick={removeFilters} data-prop={`${key}${i}`} key={`activeFilter${key}${i}`}>
				<Tag isActive>{val}</Tag>
				<CloseCon>
					<Image src={images.remove} alt='Delete filterObject' />
				</CloseCon>
			</ActiveFilter>
		);
	};

	return (
		<>
			{showAll ? (
				<SFilters>
					{role && (
						<Tag onClick={(e) => updateFilters(e)} data-prop={'role'}>
							{role}
						</Tag>
					)}
					{level && (
						<Tag onClick={(e) => updateFilters(e)} data-prop={'level'}>
							{level}
						</Tag>
					)}
					{languages?.length > 0
						? languages.map((language, i) => (
								<Tag onClick={(e) => updateFilters(e)} key={`languages${i}`} data-prop={'languages'}>
									{language}
								</Tag>
						  ))
						: null}
					{tools?.length > 0
						? tools.map((tool, i) => (
								<Tag onClick={(e) => updateFilters(e)} key={`tools${i}`} data-prop={'tools'}>
									{tool}
								</Tag>
						  ))
						: null}
				</SFilters>
			) : (
				<ActiveFilters>
					<FiltersCon>
						{Object.keys(filterObject).length > 0
							? Object.entries(filterObject).flatMap(([key, value], i) => {
									return isSet(value) ? [...value].map((arrEl, j) => renderActiveFilter(arrEl, j, key, true)) : renderActiveFilter(value, i, key);
							  })
							: null}
					</FiltersCon>
					<Clear>Clear</Clear>
				</ActiveFilters>
			)}
		</>
	);
};

export default Filters;
