import React, { useEffect, useState } from 'react';
import { Shortage, ShortageStatus } from '../../Models/shortage.model';
import { Force } from '../../Models/force.model';
import { AddForceForm } from '../AddForceForm/AddForceForm';
import AddShortageForm from '../AddShortageForm/AddShortageForm';
import { getIncompetentForces } from '../../Services/forces.service';
import { useNavigate } from 'react-router-dom';


const IncompetentForcesTable: React.FC = () => {
	const [incompetentForces, setIncompetentForces] = useState<Force[]>([]);
	const [allShortages, setAllShortages] = useState<Shortage[]>([]);
    const navigate = useNavigate();
    useEffect(()=>{
        getIncompetentForces().then((data)=>{
            console.log(data);
        })
    },[])

	const handleAddForce = (newForce: Force) => {
		setIncompetentForces(prev=>[...prev, newForce]);
	};

	const handleRemoveForce = (forceId: number) => {
		setIncompetentForces(incompetentForces.filter((force) => force.id !== forceId));
		setAllShortages(allShortages.filter((shortage) => shortage.forceId !== forceId));
	};

	const handleAddShortage = (newShortage: Shortage) => {
		setAllShortages([...allShortages, newShortage]);
	};

	const handleUpdateShortage = (updatedShortage: Shortage) => {
		setAllShortages(allShortages.map((shortage) => (shortage.id === updatedShortage.id ? updatedShortage : shortage)));
	};

    const goToHomePage = () => {
			navigate('/');
		};

	return (
		<div>
			<h2>Incompetent Forces</h2>
			<table /*border='1'*/ cellPadding='10'>
				<thead>
					<tr>
						<th>Force Name</th>
						<th>Competence</th>
						<th>Location</th>
						<th>Shortages</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{incompetentForces.map((force) => (
						<tr key={force.id}>
							<td>{force.name}</td>
							<td>{force.competence}</td>
							<td>{`(${force.location.coordinates[0]}, ${force.location.coordinates[1]})`}</td>
							<td>
								{allShortages
									.filter((shortage) => shortage.forceId === force.id)
									.map((shortage) => (
										<div key={shortage.id}>
											<span>{shortage.name}</span> -<span>{ShortageStatus[shortage.status]}</span>
										</div>
									))}
							</td>
							<td>
								<button onClick={() => handleRemoveForce(force.id!)}>Remove Force</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<AddForceForm setCompetentForces={setIncompetentForces} />
			<AddShortageForm onAddShortage={handleAddShortage} />
			<button onClick={goToHomePage} className='goToHomeButton'>
				Back to Home
			</button>
		</div>
	);
};

export default IncompetentForcesTable;
