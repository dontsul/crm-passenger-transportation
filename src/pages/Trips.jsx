import { CreateTrips } from '../components/createTrips/CreateTrips';
import { ListTrips } from '../components/listTrips/ListTrips';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const Trips = () => {
  const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
  const navigate = useNavigate();
  const user = useSelector((state) => state.authUser.user);

  useEffect(() => {
    if (user.email !== adminEmail) {
      navigate('/');
    }
  }, [user, adminEmail, navigate]);
  return (
    <div className="container">
      <CreateTrips />
      <ListTrips />
    </div>
  );
};
