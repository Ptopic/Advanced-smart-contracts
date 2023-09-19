import React from 'react';
import './Details.css';
function Details({
	owner,
	collection,
	metaDataUrl,
	imageUrl,
	blockChain,
	tokenId,
	contractAddress,
	tokenStandard,
}) {
	return (
		<div className="item-details-container">
			<div className="item-details-container-row">
				<div>
					<p>Owner</p>
				</div>

				<p>{owner}</p>
			</div>

			<div className="item-details-container-row">
				<div>
					<p>Collection</p>
				</div>

				<p>{collection}</p>
			</div>

			<div className="item-details-container-row">
				<div>
					<p>Metadata</p>
				</div>

				<a href={metaDataUrl}>{String(metaDataUrl).substring(0, 25) + '...'}</a>
			</div>

			<div className="item-details-container-row">
				<div>
					<p>Image</p>
				</div>

				<a href={imageUrl}>{String(imageUrl).substring(0, 25) + '...'}</a>
			</div>

			<div className="item-details-container-row">
				<div>
					<p>Blockchain</p>
				</div>

				<p>{blockChain}</p>
			</div>

			<div className="item-details-container-row">
				<div>
					<p>Token ID</p>
				</div>

				<p>{tokenId}</p>
			</div>

			<div className="item-details-container-row">
				<div>
					<p>Contract</p>
				</div>

				<p>{contractAddress}</p>
			</div>

			<div className="item-details-container-row">
				<div>
					<p>Token Standard</p>
				</div>

				<p>{tokenStandard}</p>
			</div>

			<div className="item-details-container-row">
				<div>
					<p>OpenSea Link</p>
				</div>

				<a href={'https://testnets.opensea.io/collection/pika-code'}>
					{'https://testnets.opensea.io/collection/pika-code'.substring(0, 25) +
						'...'}
				</a>
			</div>
		</div>
	);
}

export default Details;
