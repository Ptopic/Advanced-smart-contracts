import React, { useState, useEffect } from 'react';
import { Route, Link, Routes, useParams } from 'react-router-dom';

import { useAccount } from 'wagmi';

import Web3 from 'web3';
import contractABI from '../contractAbi.json';

// Components
import Navbar from '../components/Navbar';
import './NftPage.css';
import NftItem from '../components/NftPage/NftItem';

function NftPage() {
	const params = useParams();

	const [web3, setWeb3] = useState();
	const [contract, setContract] = useState();
	const [account, setAccount] = useState();
	const [nftData, setNftData] = useState();
	const [tokenId, setTokenId] = useState();
	const [metaDataUrl, setMetaDataUrl] = useState();
	const [imageUrl, setImageUrl] = useState();
	const { address, connector, isConnected } = useAccount();

	const contractAddress = '0xe3CDBA1520ceE1a6214b34f724c66263720ab020';

	const connectToContractAndGetNft = async () => {
		try {
			let web3 = new Web3(window.ethereum);
			setWeb3(web3);
			const contractInstance = new web3.eth.Contract(
				contractABI,
				contractAddress,
				{ gasLimit: 3000000 }
			);
			const accounts = await web3.eth.getAccounts();

			if (accounts.length > 0) {
				setContract(contractInstance);
				setAccount(address);
			}

			getNft(contractInstance, params.tokenId);
		} catch (err) {
			console.error(err);
		}
	};

	const getNft = async (contract, id) => {
		const nft = await contract.methods.uri(id).call();
		const response = await fetch(nft);
		const data = await response.json();
		setNftData(data);
		setTokenId(id);
		setMetaDataUrl(nft);
		setImageUrl(data.image);
		console.log(data);
	};
	useEffect(() => {
		// Connect to contract and get nft
		connectToContractAndGetNft();
	}, []);
	return (
		<div>
			<Navbar />
			<NftItem
				web3={web3}
				contract={contract}
				account={account}
				image={nftData?.image}
				name={nftData?.name}
				description={nftData?.description}
				traits={nftData?.attributes}
				tokenId={tokenId}
				contractAddress={contractAddress}
				metaDataUrl={metaDataUrl}
				imageUrl={imageUrl}
			/>
		</div>
	);
}

export default NftPage;
