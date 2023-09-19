import React, { useState, useEffect } from 'react';
import './Collection.css';
import NftCard from './NftCard';

function Collection({ web3, contract, account }) {
	const [amount, setAmount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [buyId, setBuyId] = useState(null);
	const [metaData, setMetaData] = useState([]);

	const getNfts = async () => {
		const count = await contract.methods.NFT_COUNT().call();
		console.log(count);

		var metadataArray = [];
		for (var i = 0; i <= count; i++) {
			const nft = await contract.methods.uri(i).call();
			const response = await fetch(nft);
			const data = await response.json();
			metadataArray.push(data);
		}
		setMetaData(metadataArray);
	};
	useEffect(() => {
		// Check all existings nfts
		getNfts();
	}, [account]);
	return (
		<div className="collection-container">
			<h1>NFTs</h1>

			<div className="nfts-container">
				{account ? (
					metaData.map((nft, index) => {
						return (
							<NftCard
								name={nft.name}
								image={nft.image}
								index={index}
								buyId={buyId}
								setBuyId={setBuyId}
							/>
						);
					})
				) : (
					<p>Connect wallet to view collection</p>
				)}
			</div>
		</div>
	);
}

export default Collection;
