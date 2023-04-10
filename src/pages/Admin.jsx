import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MyCalendar } from '../components/calendar/MyCalendar';

export const Admin = () => {
  const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
  const navigate = useNavigate();
  const user = useSelector((state) => state.authUser.user);

  useEffect(() => {
    if (user.email !== adminEmail) {
      navigate('/');
    }
  }, [user, adminEmail, navigate]);
  return (
    <div className="py-4">
      <h1 className="text-center p-4">Admin page</h1>
      <h2 className="text-center p-4">Calendar</h2>
      <MyCalendar />
    </div>
  );
};
