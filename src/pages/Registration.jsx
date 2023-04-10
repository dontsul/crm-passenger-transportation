import { Form, Button } from 'bootstrap-4-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  changeUserEmail,
  changeUserPassword,
  changeStatusLoading,
} from '../features/slices/registrationSlice';
import { auth, db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Loader } from '../components/loader/Loader';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../features/slices/authUserSlice';
import { ImCheckmark } from 'react-icons/im';

export const Registration = () => {
  const userEmail = useSelector((state) => state.registration.form.userEmail);
  const userPassword = useSelector(
    (state) => state.registration.form.userPassword
  );
  const isLoading = useSelector((state) => state.registration.isLoading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerUser = (e) => {
    e.preventDefault();

    dispatch(changeStatusLoading(true));

    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        dispatch(changeStatusLoading(false));
        toast.success('Registration successful');
        navigate('/authorization');
        dispatch(changeUserEmail(''));
        dispatch(changeUserPassword(''));

        const user = userCredential.user;
        console.log(user);
        dispatch(
          createUser({
            displayName: user.displayName || 'user',
            email: user.email,
            phoneNumber: user.phoneNumber,
          })
        );
        const userId = userCredential.user.uid;
        const userDocRef = doc(db, 'users', userId);
        const userData = {
          name: user.displayName || 'user',
          email: user.email,
          role: 'passenger',
          phone: user.phoneNumber,
        };
        setDoc(userDocRef, userData)
          .then(() => {
            console.log('Дані про користувача збережено в Firestore');
          })
          .catch((error) => {
            console.error('Помилка при збереженні даних користувача:', error);
          });
        console.log(user);
      })
      .catch((error) => {
        dispatch(changeStatusLoading(false));
        toast.error(error.message);
      });
  };

  return (
    <div className="container d-flex justify-content-center">
      {isLoading && <Loader />}
      <div className="w-50 py-3 d-flex flex-column justify-content-center align-items-center">
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
        <h2 className="py-2">Registration form</h2>
        <Form>
          <Form.Group>
            <label htmlFor="exampleInputEmail1">Email address</label>
            <Form.Input
              value={userEmail}
              onChange={(e) => dispatch(changeUserEmail(e.target.value))}
              type="email"
              id="exampleInputEmail1"
              placeholder="Enter email"
            />
            <Form.Text text="muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <label htmlFor="exampleInputPassword1">Password</label>
            <Form.Input
              value={userPassword}
              type="password"
              id="exampleInputPassword1"
              placeholder="Password"
              onChange={(e) => {
                dispatch(changeUserPassword(e.target.value));
              }}
            />
          </Form.Group>

          <Button
            className="w-100"
            primary
            type="submit"
            onClick={(e) => {
              registerUser(e);
            }}
          >
            Submit
          </Button>
        </Form>
        <Link to="/authorization">
          <p className="mt-2">
            Already an account? ? <span className="">Sign in</span>
          </p>
        </Link>
      </div>
    </div>
  );
};
