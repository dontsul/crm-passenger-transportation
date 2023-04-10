import { ListUsers } from '../components/listUsers/ListUsers';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const EditUsers = () => {
  const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
  const navigate = useNavigate();
  const user = useSelector((state) => state.authUser.user);

  useEffect(() => {
    if (user.email !== adminEmail) {
      navigate('/');
    }
  }, [user, adminEmail, navigate]);

  if (user && user.email === adminEmail) {
    return (
      <div>
        <ListUsers />
      </div>
    );
  }
};
