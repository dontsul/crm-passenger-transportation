import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { CarouselEl } from '../components/carousel/Carousel';
import { ImCheckmark } from 'react-icons/im';
import { Link } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.authUser.authStatus);

  useEffect(() => {
    if (!authStatus) {
      toast.info('You need authorization or registration.');
      navigate('/registration');
      return;
    }
  }, [navigate, authStatus]);
  return (
    <div className="container pb-4">
      <h1 className="text-center pt-4">CRM Passenger Transportation</h1>

      <CarouselEl />
    </div>
  );
};
