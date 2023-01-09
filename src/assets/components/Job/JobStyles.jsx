import styled from 'styled-components';
import colors from '../../colors';

export const Container = styled.div`
	border-left: ${({ featured }) => (featured ? `6px solid ${colors.primary}` : 'none')};
	border-radius: 5px;
	padding: 1rem;
	background: white;
	box-shadow: 0px 10px 15px 2px #03584834;
	margin-top: 3.5rem;
`;

export const Image = styled.img`
	position: absolute;
	top: -50px;
	left: 3px;
	height: auto;
	width: 50px;
`;

export const Top = styled.div`
	position: relative;
`;

export const Title = styled.h2`
	display: ${(props) => (props.inline ? 'inline-block' : 'block')};
	color: ${(props) => (props.primary ? colors.primary : 'black')};
	margin: 0.8rem 0;
	cursor: ${({ primary }) => (primary ? 'default' : 'pointer')};
	&:hover {
		color: ${({ primary }) => (!primary ? colors.primary : null)};
	}
`;

export const Sticker = styled.div`
	text-transform: uppercase;
	padding: 0.6rem;
	padding-bottom: 0.4rem;
	padding-top: 0.7rem;
	background-color: ${(props) => (props.primary ? colors.primary : 'black')};
	color: white;
	border-radius: 20px;
	height: max-content;
	display: inline-block;
	font-weight: 700;
	line-height: 0.7;
	margin-left: 0.5rem;
`;

export const Details = styled.div`
	color: ${() => colors.darkGrey};
`;

export const Detail = styled.span``;

export const Hr = styled.hr`
	color: ${() => colors.darkGrey};
`;
export const Tag = styled.div`
	background-color: ${() => colors.filterTablets};
	color: ${() => colors.primary};
	padding: 0.6rem;
	border-radius: 3px;
	width: max-content;
	height: max-content;
	font-weight: 700;
	cursor: pointer;
	margin-top: 1rem;
	display: inline-block;
	margin-right: 1rem;

	&:hover {
		background: ${() => colors.primary};
		color: white;
	}
`;
