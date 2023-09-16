import React from 'react';

function NftCard({ nft, index, buyId, setBuyId }) {
	return (
		<div
			className="nft"
			onClick={() => setBuyId(index)}
			style={{ background: index === buyId ? '#1B005D' : null }}
		>
			<div className="img-container">
				<img src={nft} alt="" />
				<p>PikaCode #{index}</p>
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
					<h2 style={{ color: index === buyId ? 'white' : null }}>0.02 ETH</h2>
				</div>
			</div>
		</div>
	);
}

export default NftCard;
