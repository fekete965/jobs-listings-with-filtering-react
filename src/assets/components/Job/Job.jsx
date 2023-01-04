import React from 'react';
import styled from 'styled-components';
import colors from '../../colors';
import { Container, Top, Image, Title, Sticker, Details, Detail, Hr, Bottom, Tag } from './JobStyles';

const Job = ({ id, company, logo, new: isNew, featured, position, role, level, postedAt, contract, location, languages, tools = [] }) => {
	return (
		<Container id={id} featured={featured}>
			<Top>
				<Image src={logo} />
				<Title inline primary>
					{position}
				</Title>
				{isNew && <Sticker primary>NEW!</Sticker>}
				{featured && <Sticker>Featured</Sticker>}
				<Title>Senior Frontend Developer</Title>
				<Details>
					<Detail>{postedAt}</Detail> · <Detail>{contract}</Detail> · <Detail>{location}</Detail>
				</Details>
			</Top>
			<Hr />
			<Bottom>
				{languages?.length > 0 ? languages.map((language) => <Tag>{language}</Tag>) : null}
				{tools?.length > 0 ? tools.map((tool) => <Tag>{tool}</Tag>) : null}
			</Bottom>
		</Container>
	);
};

export default Job;
