import { BsBusFront } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { auth } from '../../firebase/config';
import { signOut } from 'firebase/auth';

import {
  Collapse,
  Container,
  Row,
  Col,
  List,
  Navbar,
  BH4,
  BA,
} from 'bootstrap-4-react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import {
  changeAuthUserStatus,
  createUser,
} from '../../features/slices/authUserSlice';
import { useSelector, useDispatch } from 'react-redux';

export const Header = (props) => {
  const authStatus = useSelector((state) => state.authUser.authStatus);
  const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
  const user = useSelector((state) => state.authUser.user);

  const navifate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success('Logout successfully');
        dispatch(changeAuthUserStatus(false));
        navifate('/');
        dispatch(createUser({}));
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <header>
      <Collapse bg="dark" id="navbarHeader">
        <Container>
          <Row>
            <Col sm="4" offset="md-1" py="4">
              <BH4 text="white">Pages</BH4>
              <List unstyled>
                <List.Item>
                  <NavLink className="text-white" to="/">
                    Home
                  </NavLink>
                </List.Item>

                {user.email === adminEmail ? (
                  <>
                    <List.Item>
                      <NavLink className="text-white" to="/edit">
                        {' '}
                        Edit users
                      </NavLink>
                    </List.Item>
                    <List.Item>
                      <NavLink className="text-white" to="/admin">
                        Admin
                      </NavLink>
                    </List.Item>
                    <List.Item>
                      <NavLink className="text-white" to="/trips">
                        Trips
                      </NavLink>
                    </List.Item>
                  </>
                ) : null}

                {!authStatus ? (
                  <>
                    <List.Item>
                      <NavLink className="text-white" to="/authorization">
                        {' '}
                        Authorization
                      </NavLink>
                    </List.Item>
                    <List.Item>
                      <NavLink className="text-white" to="/registration">
                        {' '}
                        Registration
                      </NavLink>
                    </List.Item>
                  </>
                ) : (
                  <List.Item>
                    <NavLink className="text-white" to="/" onClick={logoutUser}>
                      Log out
                    </NavLink>
                  </List.Item>
                )}
              </List>
            </Col>
            <Col sm="4" offset="md-1" py="4">
              <BH4 text="white">Contact</BH4>
              <List unstyled>
                <List.Item>
                  <BA href="https://twitter.com/" text="white">
                    Follow on Twitter
                  </BA>
                </List.Item>
                <List.Item>
                  <BA href="https://www.facebook.com/" text="white">
                    Like on Facebook
                  </BA>
                </List.Item>
                <List.Item>
                  <BA href="https://www.instagram.com/" text="white">
                    Follow on Instagram
                  </BA>
                </List.Item>
              </List>
            </Col>
          </Row>
        </Container>
      </Collapse>
      <Navbar dark bg="dark" shadow="sm">
        <Container display="flex" justifyContent="between">
          <Navbar.Toggler
            target="#navbarHeader"
            aria-controls="navbarHeader"
            aria-label="Toggle navigation"
          />
          <NavLink className="d-flex align-items-center" to="/">
            <BsBusFront size={30} />
            <strong className="ml-2 text-white">
              Passenger transportation
            </strong>
          </NavLink>
        </Container>
      </Navbar>
    </header>
  );
};
