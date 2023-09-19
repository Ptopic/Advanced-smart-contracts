import React, { useEffect, useState } from 'react';
import { FaEthereum } from 'react-icons/fa';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { makeStyles } from '@mui/styles';

// Components
import Details from './Details';

const useStyles = makeStyles({
	tabs: {
		'& .MuiTabs-flexContainer': {
			marginBottom: '2rem',
		},
		'& .MuiTabs-indicator': {
			backgroundColor: '#173A56',
			marginBottom: '2rem',
		},
	},
	tab: {
		'&&.MuiTab-root': {
			fontSize: 16,
			textTransform: 'none',
			color: '#818485',
			borderBottom: '1px solid #818485',
			padding: '6px 6px',
			textAlign: 'start',
		},
		'&&.Mui-selected': {
			color: '#173A56',
		},
	},
});

function NftItem({
	web3,
	contract,
	account,
	image,
	name,
	description,
	traits,
	tokenId,
	contractAddress,
	metaDataUrl,
	imageUrl,
}) {
	const [loading, setLoading] = useState(false);
	const [amount, setAmount] = useState(1);
	const [tabValue, setTabValue] = useState('Details');

	const handleChange = (event, newValue) => {
		setTabValue(newValue);
	};

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

	const displayInfoOfNft = (tabValue) => {
		if (tabValue == 'Details') {
			return (
				<Details
					owner={'@PikaCode Team'}
					collection={'PikaCode'}
					metaDataUrl={metaDataUrl}
					imageUrl={imageUrl}
					blockChain={'Sepolia'}
					tokenId={tokenId}
					contractAddress={contractAddress}
					tokenStandard={'ERC-1155'}
				/>
			);
		} else if (tabValue == 'Comments') {
			return <h1>Comments</h1>;
		} else if (tabValue == 'Offers') {
			return <h1>Offers</h1>;
		} else {
			return <h1>Activity</h1>;
		}
	};

	const classes = useStyles();

	return (
		<div className="item-container">
			<div className="item-container-left">
				<img src={image} alt="" />
			</div>
			<div className="item-container-right">
				<p className="team">@PikaCode team</p>
				<h1>{name}</h1>
				<p className="description">{description}</p>
				<div className="amount-container">
					<label htmlFor="amount">Amount:</label>
					<input
						value={amount}
						onChange={(e) => setAmount(e.target.value)}
						type="number"
						required
						name="amount"
						placeholder="Amount of NFT to buy"
					/>
				</div>
				<div className="list-price">
					<div className="eth-price">
						<div>
							<p>List price</p>
						</div>
						<div className="eth-price-container">
							<FaEthereum color="#173A56" />
							<h3>{0.02 * amount} ETH</h3>
						</div>
						<div>
							<p>{30.72 * amount}€</p>
							<button onClick={(e) => mintNft(tokenId, amount, e)}>
								{loading ? (
									<div className="spinner-container">
										<div className="spinner"></div>
									</div>
								) : (
									'Buy now'
								)}
							</button>
						</div>
					</div>
					<div className="best-offer">
						<div>
							<p>Best offer</p>
						</div>
						<div>
							<h3>-</h3>
						</div>
						<div>
							<p>{'0€'}</p>
							<button>Make offer</button>
						</div>
					</div>
				</div>
				<div className="traits-container">
					<h2>Traits:</h2>
					<div className="traits-grid">
						{traits?.map((trait) => {
							return (
								<div className="trait">
									<div className="trait-name">
										{String(trait.trait_type).toUpperCase()}
									</div>
									<div className="trait-value">{trait.value}</div>
								</div>
							);
						})}
					</div>
				</div>
				<Tabs
					centered
					value={tabValue}
					variant="fullWidth"
					onChange={handleChange}
					className={classes.tabs}
				>
					<Tab
						label="Details"
						className={classes.tab}
						value={'Details'}
						disableRipple
					></Tab>
					<Tab
						label="Comments"
						className={classes.tab}
						value={'Comments'}
						disableRipple
					></Tab>
					<Tab
						label="Offers"
						className={classes.tab}
						value={'Offers'}
						disableRipple
					></Tab>
					<Tab
						label="Activity"
						className={classes.tab}
						value={'Activity'}
						disableRipple
					></Tab>
				</Tabs>
				<div className="about-nft-container">{displayInfoOfNft(tabValue)}</div>
			</div>
		</div>
	);
}

export default NftItem;
