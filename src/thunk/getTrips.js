import { createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

export const getTrips = createAsyncThunk('trips/getTrips', async () => {
  try {
    const trips = [];
    const querySnapshot = await getDocs(collection(db, 'trips'));
    querySnapshot.forEach((doc) => {
      trips.push({ ...doc.data() });
    });
    console.log(trips);
    return trips;
  } catch (error) {
    console.log(error);
  }
});
