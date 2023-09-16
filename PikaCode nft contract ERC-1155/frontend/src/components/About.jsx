import React from 'react';
import './About.css';
import solidityLogo from '../assets/images/solidity.png';
import { Link } from 'react-router-dom';

function About() {
	return (
		<div className="about" id="about">
			<section className="inspiration">
				<div className="badge">Inspiration</div>

				<div className="inspiration-container">
					<h1>Inspired by Funko Pop pikachu figures</h1>
					<p>
						For this project we used Pikachu funko pops made by funko pop
						company as inspiration.
					</p>
				</div>
			</section>

			<section className="design">
				<div className="badge">Design</div>

				<div className="design-container">
					<h1>ERC-1155 Solidity Smart Contract</h1>
					<p>
						Contract features multiple owners per single NFT. Spliting profits
						for each person on our team so that no one is left out.
					</p>
					<p>
						We also reward YOU, our holders by yearly income % and special NFT
						holders only events.
					</p>
				</div>
			</section>

			<section className="development">
				<div className="badge">Development</div>

				<div className="design-container">
					<h1>Built with:</h1>
					<div className="design-container-item">
						<img src={solidityLogo} alt="" width={100} />
						<p>Solidity</p>
					</div>
				</div>
			</section>

			<section className="minting">
				<div className="badge">Mint process?</div>

				<div className="minting-container">
					<h1>How to mint our NFT?</h1>
					<p>
						Minting proccess is fearly simple. Just connect your meta mask
						wallet (or other) to our app using connect wallet button in top
						right corner then go to collection page and pick a NFT you want.
					</p>
					<Link to={`/collection`}>View collection</Link>
				</div>
			</section>
		</div>
	);
}

export default About;
