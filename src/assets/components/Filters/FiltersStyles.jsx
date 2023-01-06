import styled from 'styled-components';
import colors from '../../colors';

export const SFilters = styled.div`
	/* background: red; */
`;

export const ActiveFilters = styled.div`
	background: white;
	padding: 1rem;
	display: flex;
	gap: 1rem;
	border-radius: 5px;
	box-shadow: 0px 10px 15px 2px #03584834;
	/* justify-content: space-between; */

	div {
		margin-top: 0;
		margin-right: 0;
	}

	div:first-of-type {
		border-radius: 5px 0 0 5px;
	}
`;

export const CloseCon = styled.div`
	border-radius: 0 5px 5px 0;
	background: ${() => colors.primary};
	width: 33.3px;
	height: 33.3px;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
`;
export const Image = styled.img``;
export const ActiveFilter = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: min-content;
	border-radius: 5px;

	&:hover div:first-of-type {
		background-color: ${() => colors.primary};
		color: white;
	}
`;

export const Clear = styled.button`
	border: none;
	background: transparent;
	color: ${() => colors.darkGrey};
	font-weight: 700;
	margin-left: auto;
	cursor: pointer;
`;

export const FiltersCon = styled.div`
	display: flex;
	gap: 1rem;
	width: 90%;
`;
