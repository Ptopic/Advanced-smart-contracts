import React, { useState } from 'react';
import { useConnect } from 'wagmi';
import './Connect.css';
function Connect() {
	const { connect, connectors, error, isLoading, pendingConnector } =
		useConnect();

	const [isOpen, setIsOpen] = useState(false);
	return (
		<>
			{isOpen && (
				<div className="connect-modal-container">
					<div className="connect-modal">
						{connectors.map((connector) => (
							<button
								disabled={!connector.ready}
								key={connector.id}
								onClick={() => connect({ connector })}
							>
								{connector.name}
								{!connector.ready && ' (unsupported)'}
								{isLoading &&
									connector.id === pendingConnector?.id &&
									' (connecting)'}
							</button>
						))}
					</div>
				</div>
			)}
			<button className="connect-btn" onClick={() => setIsOpen(true)}>
				Connect wallet
			</button>
		</>
	);
}

export default Connect;
