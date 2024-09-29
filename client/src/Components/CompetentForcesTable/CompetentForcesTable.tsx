import { deleteForce, getCompetentForces } from '../../Services/forces.service';
import { useEffect, useState, useRef } from 'react';
import { Force } from '../../Models/force.model';
import { Modal, IconButton, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddForceForm } from '../../Common/CommonComponents/AddForceForm/AddForceForm';
import { useNavigate } from 'react-router-dom';
import GoogleMapComponent from '../../Common/CommonComponents/GoogleMapComponent/GoogleMapComponent';
import { Shortage, ShortageStatus } from '../../Models/shortage.model';
import { createShortage } from '../../Services/shortages.service';
import { ToastContainer } from 'react-toastify';
import { errorToast, successToast } from '../../Common/CommonFunctions';
import './CompetentForcesTable.css';

const CompetentForcesTable: React.FC = () => {
  const [competentForces, setCompetentForces] = useState<Force[]>([]);
  const [shortageNames, setShortageNames] = useState<{ [key: number]: string }>(
    {}
  );
  const [selectedMap, setSelectedMap] = useState<[number, number] | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const paginationModel = { page: 0, pageSize: 5 };

  useEffect(() => {
    getCompetentForces().then((competentForces) =>
      setCompetentForces(competentForces)
    );
  }, []);

  const goToHomePage = () => {
    navigate('/');
  };

  const handleOpenMap = (coordinates: [number, number]) => {
    setSelectedMap(coordinates);
    setModalOpen(true);
  };

  const handleCloseMap = () => {
    setSelectedMap(null);
    setModalOpen(false);
  };

  const handleRemoveForce = (id: number) => {
    deleteForce(id)
      .then(() => {
        setCompetentForces((prev) => prev.filter((force) => force.id !== id));
        setShortageNames((prev) => ({ ...prev, [id]: '' }));
        successToast('Deleteing Force Completed Successfully!');
      })
      .catch(() => {
        errorToast('Deleteing Force Failed');
      });
  };

  const handleAddShortage = (
    forceId: number,
    inputRef: React.RefObject<HTMLInputElement>
  ) => {
    const value = shortageNames[forceId];
    if (value.trim() !== '') {
      const newShortage: Shortage = {
        forceId: forceId,
        name: value,
        status: ShortageStatus.OPEN,
      };
      createShortage(newShortage).then(() => {
        successToast('Adding Force Completed Successfully!');
        setShortageNames((prev) => ({ ...prev, [forceId]: '' }));
        inputRef.current?.blur();
      }).catch(()=>{
		errorToast('Adding Force Failed');
	  });
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    forceId: number,
    inputRef: React.RefObject<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      handleAddShortage(forceId, inputRef);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    forceId: number
  ) => {
    setShortageNames((prev) => ({ ...prev, [forceId]: e.target.value }));
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 100 },
    { field: 'competence', headerName: 'Competence', width: 100 },
    {
      field: 'location',
      headerName: 'Location',
      width: 100,
      renderCell: (params) => (
        <div
          className='googleMapContainer'
          onClick={() => handleOpenMap(params.row.location.coordinates)}
        >
          <GoogleMapComponent
            coordinates={params.row.location.coordinates}
            modalOpen={modalOpen}
          />
        </div>
      ),
    },
    {
      field: 'addShortage',
      headerName: 'Add Shortage',
      width: 200,
      renderCell: (params) => {
        const inputRef = useRef<HTMLInputElement>(null);
        return (
          <TextField
            className='addShortageTextField'
            label='Enter shortage'
            variant='outlined'
            value={shortageNames[params.row.id] || ''}
            onChange={(e) => handleChange(e, params.row.id)}
            onKeyDown={(e) => handleKeyDown(e, params.row.id, inputRef)}
            inputRef={inputRef}
          />
        );
      },
    },
    {
      field: 'delete',
      headerName: '',
      width: 10,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleRemoveForce(params.row.id)}
          aria-label='delete'
          className='deleteIcon'
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
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
            rowHeight={70}
          />
        </div>
        <AddForceForm setForces={setCompetentForces} />
        <button onClick={goToHomePage} className='goToHomeButton'>
          Back to Home
        </button>
      </div>
      <Modal open={modalOpen} onClose={handleCloseMap}>
        <div className='containerModal'>
          {selectedMap && (
            <GoogleMapComponent
              coordinates={selectedMap}
              modalOpen={modalOpen}
            />
          )}
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
};

export default CompetentForcesTable;
