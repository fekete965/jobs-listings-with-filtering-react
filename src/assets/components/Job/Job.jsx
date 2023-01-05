import React from 'react';
import styled from 'styled-components';
import colors from '../../colors';
import { Container, Top, Image, Title, Sticker, Details, Detail, Hr, Bottom, Tag } from './JobStyles';

const Job = ({ id, company, logo, new: isNew, featured, position, role, level, postedAt, contract, location, languages, tools, url, setUrl }) => {
	const updateSearchParams = (e) => {
		const key = e.target.dataset.prop;
		const value = e.target.textContent;
		const newParams = new URLSearchParams({ [key]: value }).toString();

		setUrl(`${url}?${newParams}`);
	};

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
			<Bottom>
				{role && (
					<Tag onClick={updateSearchParams} data-prop={'role'}>
						{role}
					</Tag>
				)}
				{level && <Tag data-prop={'level'}>{level}</Tag>}
				{languages?.length > 0
					? languages.map((language, i) => (
							<Tag key={`languages${i}`} data-prop={'languages'}>
								{language}
							</Tag>
					  ))
					: null}
				{tools?.length > 0
					? tools.map((tool, i) => (
							<Tag key={`tools${i}`} data-prop={'tool'}>
								{tool}
							</Tag>
					  ))
					: null}
			</Bottom>
		</Container>
	);
};

export default Job;
