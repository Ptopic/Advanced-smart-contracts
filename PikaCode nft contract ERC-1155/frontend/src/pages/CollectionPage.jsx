import React, { useState, useEffect } from 'react';

// Components
import Navbar from '../components/Navbar';
import Collection from '../components/CollectionPage/Collection';

import { useAccount } from 'wagmi';

import Web3 from 'web3';
import contractABI from '../contractAbi.json';

function CollectionPage() {
	const [web3, setWeb3] = useState();
	const [contract, setContract] = useState();
	const [account, setAccount] = useState();
	const { address, connector, isConnected } = useAccount();

	const contractAddress = '0xe3CDBA1520ceE1a6214b34f724c66263720ab020';
	const connectToContract = async () => {
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
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		if (isConnected) {
			connectToContract();
		}
	}, [isConnected]);
	return (
		<div className="collection-page">
			<Navbar />
			<Collection web3={web3} contract={contract} account={account} />
		</div>
	);
}

export default CollectionPage;
