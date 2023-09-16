import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

import {
	useAccount,
	useConnect,
	useDisconnect,
	useEnsAvatar,
	useEnsName,
} from 'wagmi';

// Components
import Connect from './Connect';

function Navbar() {
	const { address, connector, isConnected } = useAccount();
	const { data: ensAvatar } = useEnsAvatar({ address });
	const { data: ensName } = useEnsName({ address });
	const { disconnect } = useDisconnect();
	return (
		<nav className="navbar">
			<div className="navbar-left">
				<h1>PikaCode</h1>
			</div>
			<div className="navbar-right">
				<ul>
					<li>
						<a href="/#header">Home</a>
					</li>

					<li>
						<a href="/#about">About</a>
					</li>

					<li>
						<Link to={`/collection`}>Collection</Link>
					</li>

					{isConnected ? (
						<div className="disconnect-container">
							{/* <img src={ensAvatar} /> */}
							<div onClick={disconnect}>
								{address.slice(0, 6)}...{address.slice(-4)}
							</div>
							{/* <div>Connected to {connector}</div> */}
							<button onClick={disconnect}>Disconnect</button>
						</div>
					) : (
						<Connect />
					)}

					{/* <button className="connect-btn" onClick={connectWallet}>
						Connect wallet
					</button> */}
					{/* <ConnectButton coolMode /> */}

					{/* <Connect open={open} /> */}
				</ul>
			</div>
		</nav>
	);
}

export default Navbar;
