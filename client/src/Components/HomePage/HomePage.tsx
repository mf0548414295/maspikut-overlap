import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
	const navigate = useNavigate();

	const navigateToCompetentForces = () => {
		navigate('/competent-forces'); 
	};

	const navigateToIncompetentForces = () => {
		navigate('/incompetent-forces'); 
	};

	return (
		<div className='home-page-container'>
			<h1 className='title'>Forces' Tables</h1>
			<div className='button-group'>
				<button className='nav-button' onClick={navigateToCompetentForces}>
					To Competent Forces
				</button>
				<button className='nav-button' onClick={navigateToIncompetentForces}>
					To Incompetent Forces
				</button>
			</div>
		</div>
	);
};

export default HomePage;
