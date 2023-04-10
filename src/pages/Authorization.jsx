import { useState } from 'react';
import { Form, Button } from 'bootstrap-4-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  changeUserLoginEmail,
  changeUserLoginPhone,
  changeUserLoginPassword,
  changeStatusLoginLoading,
} from '../features/slices/authorizationSlice';
import { Loader } from '../components/loader/Loader';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  FacebookAuthProvider,
} from 'firebase/auth';

import { auth, db } from '../firebase/config';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import {
  changeAuthUserStatus,
  createUser,
} from '../features/slices/authUserSlice';
import OtpInput from 'react-otp-input';
import { Oval } from 'react-loader-spinner';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export const Authorization = () => {
  const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const dispatch = useDispatch();
  const userLoginEmail = useSelector(
    (state) => state.authorization.form.userEmail
  );
  const userLoginPhone = useSelector(
    (state) => state.authorization.form.userPhone
  );
  const userLoginPassword = useSelector(
    (state) => state.authorization.form.userPassword
  );
  const isLoginLoading = useSelector((state) => state.authorization.isLoading);
  const navigate = useNavigate();

  //login with email password
  const loginUser = (e) => {
    e.preventDefault();

    dispatch(changeStatusLoginLoading(true));
    signInWithEmailAndPassword(auth, userLoginEmail, userLoginPassword)
      .then((userCredential) => {
        dispatch(changeStatusLoginLoading(false));
        toast.success('Login Successfully');
        dispatch(changeUserLoginEmail(''));
        dispatch(changeUserLoginPassword(''));
        dispatch(changeAuthUserStatus(true));
        const user = userCredential.user;
        adminEmail === user.email ? navigate('/admin') : navigate('/');

        dispatch(
          createUser({
            displayName: user.displayName || 'user',
            email: user.email,
            phoneNumber: user.phoneNumber,
          })
        );
      })
      .catch((error) => {
        dispatch(changeStatusLoginLoading(false));
        toast.error(error.message);
      });
  };
  //login with google
  const provider = new GoogleAuthProvider();
  const signInWithGoogle = (e) => {
    e.preventDefault();

    dispatch(changeStatusLoginLoading(true));
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(changeStatusLoginLoading(false));
        toast.success('Login Successfully');
        dispatch(changeAuthUserStatus(true));
        navigate('/');

        const user = result.user;

        dispatch(
          createUser({
            displayName: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
          })
        );
        const userId = result.user.uid;
        const userDocRef = doc(db, 'users', userId);
        const userData = {
          name: user.displayName || 'user',
          phone: user.phoneNumber,
          email: user.email,
          role: 'passenger',
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
        dispatch(changeStatusLoginLoading(false));
        toast.error(error.message);
      });
  };

  //login with facebook
  const providerFB = new FacebookAuthProvider();
  function handleFacebookLogin(e) {
    e.preventDefault();
    signInWithPopup(auth, providerFB)
      .then((result) => {
        toast.success('Login Successfully');
        dispatch(changeAuthUserStatus(true));
        navigate('/');

        const user = result.user;
        dispatch(
          createUser({
            displayName: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
          })
        );
        const userId = result.user.uid;
        const userDocRef = doc(db, 'users', userId);
        const userData = {
          name: user.displayName || 'user',
          phone: user.phoneNumber,
          email: user.email,
          role: 'passenger',
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
        toast.error(error.message);
        console.log(error.message);
      });
  }
  //login with phone number
  const onCaptchVerify = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: (response) => {
            onSingup();
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          },
        },
        auth
      );
    }
  };

  function onSingup(e) {
    e.preventDefault();
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;
    e.preventDefault();
    const formatPh = '+' + userLoginPhone;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        console.log();
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success('OTP sended successfully');
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }

  function onOTPVerify(e) {
    e.preventDefault();
    setLoading(true);

    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        toast.success('Login Successfully');
        dispatch(changeAuthUserStatus(true));
        setLoading(false);
        setShowOTP(false);
        dispatch(changeUserLoginPhone(''));

        const user = res.user;
        dispatch(
          createUser({
            displayName: user.displayName,
            email: user.email,
            phoneNumber: user.phoneNumber,
          })
        );
        const userId = res.user.uid;
        const userDocRef = doc(db, 'users', userId);
        const userData = {
          name: user.displayName || 'user',
          phone: user.phoneNumber,
          email: user.email,
          role: 'passenger',
        };
        setDoc(userDocRef, userData)
          .then(() => {
            console.log('Дані про користувача збережено в Firestore');
          })
          .catch((error) => {
            console.error('Помилка при збереженні даних користувача:', error);
          });
        console.log(user);
        navigate('/');
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  }

  return (
    <div className="container d-flex  justify-content-center">
      {isLoginLoading && <Loader />}
      <div className="w-50 py-3 d-flex flex-column justify-content-center align-items-center">
        <h2 className="py-2">Authorization form</h2>
        <Form>
          <Form.Group>
            <label htmlFor="exampleInputEmail1">Email address</label>
            <Form.Input
              value={userLoginEmail}
              onChange={(e) => dispatch(changeUserLoginEmail(e.target.value))}
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
              value={userLoginPassword}
              onChange={(e) =>
                dispatch(changeUserLoginPassword(e.target.value))
              }
              type="password"
              id="exampleInputPassword1"
              placeholder="Password"
              required
            />
          </Form.Group>
          <Button
            className="w-100"
            primary
            onClick={(e) => {
              loginUser(e);
            }}
          >
            Authorization
          </Button>

          <hr className="my-4" />

          {/* phone */}
          <Form.Group>
            <div id="recaptcha-container"></div>
            {!showOTP ? (
              <>
                {' '}
                <label htmlFor="phoneInput">Phone</label>
                <PhoneInput
                  id="phoneInput"
                  country={'ua'}
                  value={userLoginPhone}
                  onChange={(p) => {
                    dispatch(changeUserLoginPhone(p));
                  }}
                />
                <Button
                  onClick={(e) => {
                    onSingup(e);
                  }}
                  className="w-100 d-flex justify-content-center mt-3"
                  primary
                >
                  <span>Send code via SMS</span>
                </Button>
              </>
            ) : (
              <div className=" mt-3">
                <div className="d-flex justify-content-center mb-3">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    disabled={false}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>

                <Button
                  className="w-100 d-flex justify-content-center "
                  primary
                  onClick={(e) => {
                    onOTPVerify(e);
                  }}
                >
                  {loading && (
                    <Oval
                      height={20}
                      width={20}
                      color="#ffffff"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#f1f1f1"
                      strokeWidth={2}
                      strokeWidthSecondary={2}
                    />
                  )}
                  <span>Verify</span>
                </Button>
              </div>
            )}
          </Form.Group>

          <hr className="my-4" />
          <Form.Group>
            <Button
              className="w-100"
              primary
              onClick={(e) => {
                signInWithGoogle(e);
              }}
            >
              Authorization with Google
            </Button>
          </Form.Group>
          <hr className="my-4" />
          <Form.Group>
            <Button
              className="w-100"
              primary
              onClick={(e) => {
                handleFacebookLogin(e);
              }}
            >
              Authorization with Facebook
            </Button>
          </Form.Group>
        </Form>
        <Link to="/registration">
          <p className="mt-2">
            Don&apos;t have an account? <span className="">Sign up</span>
          </p>
        </Link>
      </div>
    </div>
  );
};
