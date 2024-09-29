import React, { useEffect, useState } from 'react';
import { Shortage, ShortageStatus } from '../../Models/shortage.model';
import { Force } from '../../Models/force.model';
import { AddForceForm } from '../../Common/CommonComponents/AddForceForm/AddForceForm';
import { getIncompetentForces } from '../../Services/forces.service';
import { updateShortage } from '../../Services/shortages.service';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Modal, TextField, Button, Tooltip } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { errorToast, successToast } from '../../Common/CommonFunctions';
import './IncompetentForcesTable.css';

const IncompetentForcesTable: React.FC = () => {
  const [incompetentForces, setIncompetentForces] = useState<Force[]>([]);
  const [editingShortages, setEditingShortages] = useState<Shortage[]>([]);
  const [selectedForce, setSelectedForce] = useState<Force | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const paginationModel = { page: 0, pageSize: 5 };

  useEffect(() => {
    getIncompetentForces().then((data) => {
      setIncompetentForces(data);
    });
  }, []);

  const goToHomePage = () => {
    navigate('/');
  };

  const handleOpenModal = (force: Force) => {
    setSelectedForce(force);
    setEditingShortages(
      force.shortage_ids!.map((id, index) => ({
        id: id,
        forceId: force.id!,
        name: force.shortage_names![index],
        status: force.shortage_statuses![index],
      }))
    );
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedForce(null);
  };

  const handleUpdateShortage = (
    shortageId: number,
    name: string,
    status: number
  ) => {
    updateShortage(shortageId, { name, status })
      .then(() => {
        successToast('Updating Shortage Completed Successfully!');
      })
      .catch(() => {
        errorToast('Updating Shortage Failed');
      });
  };

  const handleChangeShortageName = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    shortageId: number
  ) => {
    const updatedName = e.target.value;
    setEditingShortages((prev) =>
      prev.map((shortage) =>
        shortage.id === shortageId
          ? { ...shortage, name: updatedName }
          : shortage
      )
    );
  };

  const handleChangeShortageStatus = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    shortageId: number
  ) => {
    const newStatus = parseInt(e.target.value);
    setEditingShortages((prevShortages) =>
      prevShortages.map((shortage) =>
        shortage.id === shortageId
          ? { ...shortage, status: newStatus }
          : shortage
      )
    );
  };

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Force Name', width: 100 },
    { field: 'competence', headerName: 'Competence', width: 100 },
    {
      field: 'location',
      headerName: 'Location',
      width: 100,
    },
    {
      field: 'shortages',
      headerName: 'Shortages',
      width: 200,
      renderCell: (params) => (
        <Tooltip title='Click to view and edit shortages'>
          <Button
            variant='contained'
            onClick={() => handleOpenModal(params.row)}
          >
            View Shortages
          </Button>
        </Tooltip>
      ),
    },
  ];

  return (
    <div className='incompetentForcesContainer'>
      <h2>Incompetent Forces</h2>
      <div className='dataGridIncompetentForcesContainer'>
        <DataGrid
          rows={incompetentForces}
          columns={columns}
          getRowId={(row) => row.id!}
          rowHeight={80}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5]}
          pagination
        />
      </div>
      <AddForceForm setForces={setIncompetentForces} />
      <button onClick={goToHomePage} className='goToHomeButton'>
        Back to Home
      </button>

      <Modal open={modalOpen} onClose={handleCloseModal}>
        <div className='containerModal'>
          <h3 className='modalHeader'>Edit Shortages</h3>
          {selectedForce && (
            <div>
              {editingShortages.map((shortage) => (
                <div key={shortage.id} className='shortageRow'>
                  <div className='shortageField'>
                    <TextField
                      label='Shortage Name'
                      variant='outlined'
                      value={shortage.name}
                      onChange={(e) =>
                        handleChangeShortageName(e, shortage.id!)
                      }
                      onBlur={() =>
                        handleUpdateShortage(
                          shortage.id!,
                          shortage.name,
                          shortage.status
                        )
                      }
                    />
                  </div>
                  <div className='statusField'>
                    <TextField
                      select
                      label='Shortage Status'
                      value={shortage.status}
                      onChange={(e) =>
                        handleChangeShortageStatus(e, shortage.id!)
                      }
                      SelectProps={{
                        native: true,
                      }}
                    >
                      <option value={ShortageStatus.OPEN}>Open</option>
                      <option value={ShortageStatus.IN_PROGRESS}>
                        In Progress
                      </option>
                      <option value={ShortageStatus.CLOSED}>Closed</option>
                    </TextField>
                  </div>
                </div>
              ))}
              <Button
                onClick={handleCloseModal}
                variant='contained'
                style={{ marginTop: '20px' }}
              >
                Close
              </Button>
            </div>
          )}
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
};

export default IncompetentForcesTable;
