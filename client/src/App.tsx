import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CompetentForcesTable from './Components/CompetentForcesTable/CompetentForcesTable';
import IncompetentForcesTable from './Components/IncompetentForcesTable/IncompetentForcesTable';
import HomePage from './Components/HomePage/HomePage';

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path='/competent-forces' element={<CompetentForcesTable />} />
				<Route path='/incompetent-forces' element={<IncompetentForcesTable />} />
				<Route path='/' element={<HomePage />} />
			</Routes>
		</Router>
	);
};

export default App;
