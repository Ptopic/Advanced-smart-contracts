import React, { useState } from 'react';
import './Collection.css';
import nft0 from '../assets/images/0.png';
import nft1 from '../assets/images/1.png';
import nft2 from '../assets/images/2.png';
import NftCard from './NftCard';
import { FaEthereum } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';

function Collection({ web3, contract, account }) {
	const [amount, setAmount] = useState(0);
	const [loading, setLoading] = useState(false);
	const [buyId, setBuyId] = useState(null);
	const [buyModalVisible, setBuyModalVisible] = useState(false);
	const images = [nft0, nft1, nft2];

	const mintNft = async (id, amount, e) => {
		e.preventDefault();
		try {
			setLoading(true);
			await contract.methods.publicMint(id, amount).send({
				from: account,
				value: web3.utils.toWei((0.02 * amount).toString(), 'ether'),
			});
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
			console.log('success');
		}
	};
	return (
		<div className="collection-container">
			<h1>NFTs</h1>

			<div className="nfts-container">
				{images.map((nft, index) => {
					return (
						<NftCard
							nft={nft}
							index={index}
							buyId={buyId}
							setBuyId={setBuyId}
						/>
					);
				})}
			</div>

			{buyId || buyId == 0 ? (
				<div
					className="buy-icon-container"
					onClick={() => setBuyModalVisible(true)}
				>
					<FaEthereum size={64} color="white" />
				</div>
			) : null}

			{buyModalVisible && (
				<div className="buy-modal-container">
					<div className="buy-modal">
						<div
							className="close-btn"
							onClick={() => setBuyModalVisible(false)}
						>
							<AiOutlineClose size={36} color="#1B005D" />
						</div>
						<h1>Buy nft - PikaCode #{buyId}</h1>

						<form onSubmit={(e) => mintNft(buyId, amount, e)}>
							<label>Enter amount of NFT to buy:</label>
							<input
								type="text"
								name="amount"
								autoComplete="false"
								required="true"
								onChange={(e) => setAmount(e.target.value)}
							/>
							<button
								type="submit"
								className="connect-btn"
								style={{ width: '150px' }}
							>
								Buy NFT
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}

export default Collection;
