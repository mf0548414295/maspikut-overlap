import { getCompetentForces } from '../../Services/forces.service';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { Force } from '../../Models/force.model';

const CompetentForcesTable = () => {
	const [competentForces, setCompetentForces] = useState<Force[]>([]);
	useEffect(() => {
		getCompetentForces().then((data) => {setCompetentForces(data);console.log(data)});
	}, []);

	const columns: GridColDef[] = [
		{ field: 'id', headerName: 'ID', width: 90 },
		{ field: 'name', headerName: 'שם הכוח', width: 150 },
		{ field: 'competence', headerName: 'כשירות', width: 150 },
	];

	const MapComponent: React.FC<{ location: { coordinates: [number, number] } }> = ({ location }) => {
		const [lat, lng] = location.coordinates; 

		return (
			<LoadScript googleMapsApiKey={import.meta.env.VITE_API_KEY}>
				<GoogleMap mapContainerStyle={{ height: '400px', width: '100%' }} center={{ lat, lng }} zoom={10}>
					<Marker position={{ lat, lng }} />
				</GoogleMap>
			</LoadScript>
		);
	};

	return (
		<div style={{ display: 'flex', flexDirection: 'column', height: 600 }}>
			<DataGrid rows={competentForces} columns={columns}  checkboxSelection />
			{competentForces.map((force) => (
				<div key={force.id} style={{ marginTop: '20px' }}>
					<h3>{force.name}</h3>
					<MapComponent location={force.location} />
				</div>
			))}
		</div>
	);
};
export default CompetentForcesTable;
