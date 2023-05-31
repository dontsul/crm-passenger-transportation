import { Form, Button } from 'bootstrap-4-react';
import { useState } from 'react';
import { db } from '../../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { getTrips } from '../../thunk/getTrips';

async function addDataToFirestore(collectionName, data, dispatch) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    toast.success('Trip created');
    dispatch(getTrips());
  } catch (e) {
    toast.error(e);
    console.error('Error adding document:', e);
  }
}

export const CreateTrips = () => {
  const [registrationPlates, setRegistrationPlates] = useState('');
  const [passengers, setPassengers] = useState('');
  const [fromTrip, setFromTrip] = useState('');
  const [whereTrip, setWhereTrip] = useState('');
  const dispatch = useDispatch();

  const handleCreateTrip = (e) => {
    e.preventDefault();
    const data = {
      registrationPlates,
      passengers,
      fromTrip,
      whereTrip,
      id: uuidv4(),
    };

    addDataToFirestore('trips', data, dispatch);
    setRegistrationPlates('');
    setPassengers('');
    setFromTrip('');
    setWhereTrip('');
  };

  return (
    <div>
      <h2 className="text-center pt-4 pb-4">Create trip</h2>
      <Form className="d-flex flex-wrap justify-content-center">
        <Form.Group style={{ width: '45%', margin: '0 20px 20px 20px' }}>
          <label htmlFor="exampleInputEmail1">Registration plates</label>
          <Form.Input
            value={registrationPlates}
            onChange={(e) => {
              setRegistrationPlates(e.target.value);
            }}
            type="text"
            id="exampleInputEmail1"
            placeholder="Registration plates"
          />
        </Form.Group>
        <Form.Group style={{ width: '45%', margin: '0 20px 20px 20px' }}>
          <label htmlFor="exampleInputEmail1">Number of passengers</label>
          <Form.Input
            value={passengers}
            onChange={(e) => {
              setPassengers(e.target.value);
            }}
            type="number"
            id="exampleInputEmail1"
            placeholder="Number of passengers"
          />
        </Form.Group>
        <Form.Group style={{ width: '45%', margin: '0 20px 20px 20px' }}>
          <label htmlFor="exampleInputEmail1">Where from</label>
          <Form.Input
            value={fromTrip}
            onChange={(e) => {
              setFromTrip(e.target.value);
            }}
            type="text"
            id="exampleInputEmail1"
            placeholder="Where from"
          />
        </Form.Group>
        <Form.Group style={{ width: '45%', margin: '0 20px 20px 20px' }}>
          <label htmlFor="exampleInputEmail1">Where to trip</label>
          <Form.Input
            value={whereTrip}
            onChange={(e) => {
              setWhereTrip(e.target.value);
            }}
            type="text"
            id="exampleInputEmail1"
            placeholder="Where to trip"
          />
        </Form.Group>
        <Form.Group style={{ width: '50%', margin: '20px 20px' }}>
          <Button
            className="w-100"
            primary
            onClick={(e) => {
              handleCreateTrip(e);
            }}
          >
            Create trip
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
};
