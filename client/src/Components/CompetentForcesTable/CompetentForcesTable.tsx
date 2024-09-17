import { getCompetentForces } from '../../Services/forces.service';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useEffect, useState } from 'react';
import { Force } from '../../Models/force.model';
import { Modal, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete'; 
import './CompetentForcesTable.css';
import { AddForceForm } from './AddForceForm/AddForceForm';
import { mapContainerClose, mapContainerOpen } from './ComponentForcesTable.StyleSheet';

const CompetentForcesTable: React.FC = () => {
	const [competentForces, setCompetentForces] = useState<Force[]>([]);
	const [selectedMap, setSelectedMap] = useState<[number, number] | null>(null);
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	const handleOpenMap = (coordinates: [number, number]) => {
		setSelectedMap(coordinates);
		setModalOpen(true);
	};

	const handleCloseMap = () => {
		setSelectedMap(null);
		setModalOpen(false);
	};

	const handleDeleteForce = (id: number) => {
		setCompetentForces(competentForces.filter((force) => force.id !== id));
	};

	useEffect(() => {
		getCompetentForces().then((data) => setCompetentForces(data));
	}, []);

	const columns: GridColDef[] = [
		{ field: 'name', headerName: 'Name', width: 100 },
		{ field: 'competence', headerName: 'Competence', width: 100 },
		{
			field: 'location',
			headerName: 'Location',
			width: 100,
			renderCell: (params) => (
				<div className='googleMapContainer' onClick={() => handleOpenMap(params.row.location.coordinates)}>
					<GoogleMapComponent coordinates={params.row.location.coordinates} />
				</div>
			),
		},
		{
			field: 'delete',
			headerName: '',
			width: 10,
			renderCell: (params) => (
				<IconButton
					onClick={() => handleDeleteForce(params.row.id)}
					aria-label='delete'
					className='deleteIcon'
				>
					<DeleteIcon />
				</IconButton>
			),
		},
	];

	const paginationModel = { page: 0, pageSize: 5 };

	const GoogleMapComponent: React.FC<{ coordinates: [number, number] }> = ({ coordinates }) => {
		const [lat, lng] = coordinates;

		return (
			<LoadScript googleMapsApiKey={import.meta.env.VITE_API_KEY}>
				<GoogleMap mapContainerStyle={modalOpen ? mapContainerOpen : mapContainerClose} center={{ lat, lng }} zoom={10}>
					<Marker position={{ lat, lng }} />
				</GoogleMap>
			</LoadScript>
		);
	};

	return (
		<div className='componentForcesContainer'>
			<h1>Competent Forces</h1>
			<div className='dataGridContainer'>
				<DataGrid
					rows={competentForces}
					columns={columns}
					initialState={{ pagination: { paginationModel } }}
					pageSizeOptions={[5]}
					pagination
					getRowId={(row) => row.id!}
					rowHeight={80}
				/>
			</div>
			<AddForceForm setCompetentForces={setCompetentForces} competentForces={competentForces} />
			<Modal open={modalOpen} onClose={handleCloseMap}>
				<div className='containerModal'>{selectedMap && <GoogleMapComponent coordinates={selectedMap} />}</div>
			</Modal>
		</div>
	);
};

export default CompetentForcesTable;
