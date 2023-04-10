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
      <div className="d-flex justify-content-center align-items-center text-center pt-2">
        <ImCheckmark color="green" size={30} />{' '}
        <span style={{ fontSize: '1.5rem' }}>
          All functionality is available only for the admin
        </span>
        <ImCheckmark color="green" size={30} />
      </div>
      <div>
        <h4>Login: dontsul.v@gmail.com </h4>
        <h4>Password: 123456</h4>
        <Link to="/authorization">
          <p className="mt-2">
            {' '}
            <span className="">Sign in</span>
          </p>
        </Link>
      </div>
      <CarouselEl />
    </div>
  );
};
