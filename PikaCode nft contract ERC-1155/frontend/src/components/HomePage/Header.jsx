import React from 'react';
import './Header.css';
import nftImage from '../../assets/images/1.png';
import { Link } from 'react-router-dom';
function Header() {
	return (
		<div className="main-header" id="header">
			<div className="main-header-left">
				<div className="main-header-left-image">
					<img src={nftImage} alt="" />
				</div>
			</div>
			<div className="main-header-right">
				<h1>PikaCode - NFT Collection</h1>
				<h2>
					Collection of coder pikachus drinking coffee and writing javascript
					code. 👌
				</h2>
				<p>Want to learn more?</p>

				<Link to={`/collection`}>View collection</Link>
			</div>
		</div>
	);
}

export default Header;
