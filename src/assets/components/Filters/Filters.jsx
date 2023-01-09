import React, { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import images from '../../images';
import { Tag } from '../Job/JobStyles';
import { ActiveFilter, ActiveFilters, Clear, CloseCon, Image, SFilters, FiltersCon } from './FiltersStyles';

const Filters = ({ params, setParams, url, setUrl, showAll, role, level, languages, tools, showFilters, setShowFilters }) => {
	const [count, setCount] = useState(0);

	const hasParam = (params) => {
		if (params) {
			return Object.keys(params).some((prop) => {
				if (isSet(params[prop])) {
					return true;
				} else if (typeof params[prop] === 'string') {
					return Boolean(params[prop]);
				}
				return false;
			});
		}
		return false;
	};

	const updateSearchParams = (e) => {
		const key = e.target.dataset.prop;
		const value = e.target.textContent;
		const urlCopy = new URL(url);

		const isPrimitive = (key) => key === 'role' || key === 'level';
		const isFirstFilter = (url) => url === 'http://localhost:3000/jobs';
		const isInUrl = (url, keyOrValue) => url.includes(keyOrValue);
		const getRegexQuery = (value) => `(?=.*${value})`;

		const queryString = isFirstFilter(url) ? '?' : '&';
		const updatedKey = isPrimitive(key) && !isInUrl(url, key) ? key : `${key}_like`;
		const newParam = new URLSearchParams({ [updatedKey]: isPrimitive(key) ? value : getRegexQuery(value) }).toString();

		const newUrl = url + queryString + newParam;

		// early return for existing primitive value
		if (isPrimitive(key) && isInUrl(url, value)) return;

		// add new primitive param
		if (isPrimitive(key) && !isInUrl(url, value)) setUrl(newUrl);

		// complex: get old param, add new param, modify link
		if (isInUrl(url, key)) {
			const searchParams = new URLSearchParams(new URL(url).search);
			const oldValue = searchParams.get(updatedKey);
			const oldValueAll = searchParams.getAll(updatedKey);
			let allValues = '';
			oldValueAll.forEach((value) => (allValues += value));
			const newValues = allValues + getRegexQuery(value);
			searchParams.set(updatedKey, newValues);
			urlCopy.search = searchParams;
			setUrl(urlCopy.toString());
		}

		// handle new complex param
		if (!isInUrl(url, key)) {
			setUrl(newUrl);
		}
	};

	const isSet = (object) => object instanceof Set;

	const addParams = (e) => {
		const prop = e.target.dataset.prop;
		const value = e.target.textContent;

		if (params && isSet(params[prop])) {
			setParams({ ...params, [prop]: new Set([...params[prop], value]) });
		} else {
			setParams({
				...params,
				[prop]: value
			});
		}
	};

	const updateFilters = (e) => {
		setShowFilters(true);
		updateSearchParams(e);
		addParams(e);
	};

	const removeFilters = (e) => {
		removeSearchParam(e);
		removeFilter(e);
		console.warn(hasParam(params));
		!hasParam(params) ? setShowFilters(false) : null;
	};

	const removeSearchParam = (e) => {
		const urlCopy = new URL(url);
		const searchParams = new URLSearchParams(urlCopy.search);
		const key = e.currentTarget.dataset.prop + '_like';
		const value = e.target.textContent;

		searchParams.getAll(key).forEach((oldValue) => {
			if (oldValue === value) searchParams.delete(key);
		});

		if (searchParams.entries().length === 0) setUrl(urlCopy.href);
		urlCopy.search = searchParams;
		setUrl(urlCopy.toString());
	};

	const removeFilter = (e) => {
		const paramsCopy = params;
		const paramKey = e.currentTarget.dataset.prop.slice(0, -1);
		const paramValue = e.target.textContent;

		Object.entries(paramsCopy).forEach(([key, value]) => {
			if (isSet(paramsCopy[paramKey]) && paramsCopy[paramKey].has(paramValue)) {
				paramsCopy[paramKey].delete(paramValue);
			} else if (typeof paramsCopy[paramKey] === 'string') {
				paramsCopy[paramKey] = '';
			}
		});
		setParams(paramsCopy);
		setCount((prevCount) => prevCount - 1);
	};

	const handleClearFilters = () => {
		setShowFilters(false);
		const paramsCopy = Object.assign(params);
		for (const prop in paramsCopy) {
			if (isSet(prop)) prop.forEach((el) => prop.delete(el));
			else paramsCopy[prop] = null;
		}
		setParams(paramsCopy);
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
						{hasParam(params)
							? Object.entries(params).flatMap(([key, value], i) => {
									return isSet(value) ? [...value].map((arrEl, j) => renderActiveFilter(arrEl, j, key, true)) : renderActiveFilter(value, i, key);
							  })
							: null}
					</FiltersCon>
					<Clear onClick={handleClearFilters}>Clear</Clear>
				</ActiveFilters>
			)}
		</>
	);
};

export default Filters;
