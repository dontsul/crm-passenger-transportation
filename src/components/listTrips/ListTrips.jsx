import { Trip } from '../trip/Trip';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTrips } from '../../thunk/getTrips';
import { ListGroup } from 'bootstrap-4-react';

export const ListTrips = () => {
  const dispatch = useDispatch();
  const trips = useSelector((state) => state.trips.tripsList);
  useEffect(() => {
    dispatch(getTrips());
  }, [dispatch]);

  return (
    <div className="py-4">
      {trips?.length === 0 && <h2 className="text-center pt-4">There are not users</h2>}
      <ListGroup>
        {trips.map((trip) => {
          return <Trip trip={trip} key={trip.id} />;
        })}
      </ListGroup>
    </div>
  );
};
