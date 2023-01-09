import React from 'react';
import styled from 'styled-components';
import colors from '../../colors';
import Filters from '../Filters/Filters';
import { SFilters } from '../Filters/FiltersStyles';
import { Container, Top, Image, Title, Sticker, Details, Detail, Hr, Tag } from './JobStyles';

const Job = ({ id, company, logo, new: isNew, featured, position, role, level, postedAt, contract, location, languages, tools, url, setUrl, showFilters, setShowFilters, params, setParams }) => {
	return (
		<Container id={id} featured={featured}>
			<Top>
				<Image src={logo} />
				<Title inline primary>
					{company}
				</Title>
				{isNew && <Sticker primary>NEW!</Sticker>}
				{featured && <Sticker>Featured</Sticker>}
				<Title>{position}</Title>
				<Details>
					<Detail>{postedAt}</Detail> · <Detail>{contract}</Detail> · <Detail>{location}</Detail>
				</Details>
			</Top>
			<Hr />

			<Filters showAll role={role} level={level} languages={languages} tools={tools} url={url} setUrl={setUrl} showFilters={showFilters} setShowFilters={setShowFilters} params={params} setParams={setParams}></Filters>
		</Container>
	);
};

export default Job;
