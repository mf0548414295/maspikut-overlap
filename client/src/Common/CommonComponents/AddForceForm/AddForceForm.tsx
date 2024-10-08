import { Button, TextField } from '@mui/material';
import { Competence, Force } from '../../../Models/force.model';
import { Formik, Form, ErrorMessage } from 'formik';
import { createForce } from '../../../Services/forces.service';
import * as Yup from 'yup';
import './AddForceForm.css';
import { errorToast, successToast } from '../../CommonFunctions';

export const AddForceForm: React.FC<{
  setForces: React.Dispatch<React.SetStateAction<Force[]>>;
}> = ({ setForces }) => {
  const handleAddForce = (newForce: Force) => {
    createForce(newForce).then((newForce) => {
      successToast('Adding Force Completed Successfully!');
      setForces((prev) => [...prev, { ...newForce }]);
    }).catch(()=>{
      errorToast('Adding Force Failed');
    });
  };

  const handleChangeField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFieldValue: Function,
    field: string
  ) => {
    const value = Number(e.target.value);
    if (field === 'competence') {
      if (value === 1 || value === 2 || value === 3 || e.target.value === '') {
        setFieldValue(field, value);
      }
    } else if (value >= 0) {
      setFieldValue(field, value);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    competence: Yup.number().required('Competence is required'),
    latitude: Yup.number().required('Latitude is required'),
    longitude: Yup.number().required('Longitude is required'),
  });

  return (
    <Formik
      initialValues={{
        name: '',
        competence: 0,
        latitude: 0,
        longitude: 0,
      }}
      validationSchema={validationSchema}
      onSubmit={(values, { resetForm }) => {
        const newForce = {
          name: values.name,
          competence: values.competence as Competence,
          location: {
            type: 'Point',
            coordinates: [values.latitude, values.longitude] as [
              number,
              number
            ],
          },
        };
        handleAddForce(newForce);
        resetForm();
      }}
    >
      {({ handleChange, handleBlur, values, setFieldValue }) => (
        <Form className='addForce'>
          <div className='fieldContainer'>
            <TextField
              name='name'
              label='Name'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
            />
            <ErrorMessage
              name='name'
              component='div'
              className='errorMessage'
            />
          </div>

          <div className='fieldContainer'>
            <TextField
              name='competence'
              label='Competence'
              type='number'
              onChange={(e) =>
                handleChangeField(e, setFieldValue, 'competence')
              }
              onBlur={handleBlur}
              value={values.competence}
            />
            <ErrorMessage
              name='competence'
              component='div'
              className='errorMessage'
            />
          </div>

          <div className='fieldContainer'>
            <TextField
              name='latitude'
              label='Latitude'
              type='number'
              onChange={(e) => handleChangeField(e, setFieldValue, 'latitude')}
              onBlur={handleBlur}
              value={values.latitude}
            />
            <ErrorMessage
              name='latitude'
              component='div'
              className='errorMessage'
            />
          </div>

          <div className='fieldContainer'>
            <TextField
              name='longitude'
              label='Longitude'
              type='number'
              onChange={(e) => handleChangeField(e, setFieldValue, 'longitude')}
              onBlur={handleBlur}
              value={values.longitude}
            />
            <ErrorMessage
              name='longitude'
              component='div'
              className='errorMessage'
            />
          </div>

          <Button type='submit' color='primary'>
            Add Force
          </Button>
        </Form>
      )}
    </Formik>
  );
};
