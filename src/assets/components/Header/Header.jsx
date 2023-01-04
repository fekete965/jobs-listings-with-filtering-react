import React from 'react';
import images from '../../images';
import { Image, SHeader } from './HeaderStyles';

const Header = () => {
	return (
		<SHeader>
			<Image src={images.bgHeaderMobile} alt='' />
		</SHeader>
	);
};

export default Header;
