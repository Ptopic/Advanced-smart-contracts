import React from 'react';
import { Link } from 'react-router-dom';

function NftCard({ name, image, index, buyId, setBuyId }) {
	return (
		<div className="nft" onClick={() => setBuyId(index)}>
			<Link to={`/token/${index}`}>
				<div className="img-container">
					<img src={image} alt="" />
					<p>{name}</p>
				</div>
				<div className="nft-content">
					<div className="author-container">
						<p style={{ color: index === buyId ? 'white' : null }}>
							@PikaCode Team
						</p>
					</div>

					<div className="seperator"></div>
					<div className="price-container">
						<p>Buy now</p>
						<h2 style={{ color: index === buyId ? 'white' : null }}>
							0.02 ETH
						</h2>
					</div>
				</div>
			</Link>
		</div>
	);
}

export default NftCard;
