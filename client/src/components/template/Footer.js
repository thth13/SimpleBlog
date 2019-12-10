import React from 'react';

import fb from '../../img/facebook.png';
import tw from '../../img/twitter.png';
import ins from '../../img/instagram.png';

const Footer = () => (
	<footer>
		<ul className="footerLinks">
			<li>Terms and conditions</li>
			<li>Privacy</li>
		</ul>
		<ul className="footerSocial">
			<p>Follow</p>
			<li><img src={fb} alt="facebok" /></li>
			<li><img src={tw} alt="twitter" /></li>
			<li><img src={ins} alt="instagram" /></li>
		</ul>
	</footer>
);

export default Footer;