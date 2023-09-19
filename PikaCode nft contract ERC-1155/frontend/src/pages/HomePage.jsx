import React from 'react';
// Components
import Navbar from '../components/Navbar';
import Header from '../components/HomePage/Header';
import About from '../components/HomePage/About';

function HomePage() {
	return (
		<>
			<Navbar />
			<Header />
			<About />
		</>
	);
}

export default HomePage;
