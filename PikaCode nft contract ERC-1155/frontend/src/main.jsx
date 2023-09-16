import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Buffer } from 'buffer';
import CollectionPage from './pages/CollectionPage.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
	WagmiConfig,
	createConfig,
	configureChains,
	mainnet,
	sepolia,
} from 'wagmi';

import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';

if (!window.Buffer) {
	window.Buffer = Buffer;
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
	[mainnet],
	[
		alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_KEY }),
		publicProvider(),
	]
);

// Set up wagmi config
const config = createConfig({
	autoConnect: true,
	connectors: [
		new MetaMaskConnector({ chains }),
		new CoinbaseWalletConnector({
			chains,
			options: {
				appName: 'wagmi',
				jsonRpcUrl: `https://eth-mainnet.alchemyapi.io/v2/${
					import.meta.env.VITE_ALCHEMY_KEY
				}`,
			},
		}),
		new WalletConnectConnector({
			chains,
			options: {
				projectId: import.meta.env.VITE_WALLET_CONNECT,
			},
		}),
	],
	publicClient,
	webSocketPublicClient,
});

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
	},
	{
		path: '/collection',
		element: <CollectionPage />,
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<WagmiConfig config={config}>
			<RouterProvider router={router} />
		</WagmiConfig>
	</React.StrictMode>
);
