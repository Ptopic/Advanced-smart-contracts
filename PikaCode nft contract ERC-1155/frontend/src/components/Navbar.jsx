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

import { RxHamburgerMenu } from 'react-icons/rx';
import { IoCloseOutline } from 'react-icons/io5';

// Components
import Connect from './Connect';

function Navbar() {
	const { address, connector, isConnected } = useAccount();
	const { data: ensAvatar } = useEnsAvatar({ address });
	const { data: ensName } = useEnsName({ address });
	const { disconnect } = useDisconnect();

	const [open, setOpen] = useState();

	const toggleNav = () => {
		open ? setOpen(false) : setOpen(true);
	};
	return (
		<>
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
					</ul>
				</div>
			</nav>

			<nav className="navbar-mobile">
				<h1>PikaCode</h1>
				<button onClick={() => toggleNav()} className="toggle-btn">
					<RxHamburgerMenu size={36} color="#173A56" />
				</button>
				{open && (
					<div className="navbar-mobile-container">
						<button onClick={() => toggleNav()} className="close-btn">
							<IoCloseOutline size={42} color="#173A56" />
						</button>
						<div className="navbar-mobile-content">
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
									<li className="disconnect-container-mobile">
										<div>
											{address.slice(0, 6)}...{address.slice(-4)}
										</div>
										<button onClick={disconnect}>Disconnect</button>
									</li>
								) : (
									<li>
										<Connect />
									</li>
								)}
							</ul>
						</div>
					</div>
				)}
			</nav>
		</>
	);
}

export default Navbar;
