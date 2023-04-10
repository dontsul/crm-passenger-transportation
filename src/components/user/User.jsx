import React from 'react';
import { ListGroup, Button } from 'bootstrap-4-react';
import { useState } from 'react';
import { updateData } from '../../thunk/updateData';
import { getUsers } from '../../thunk/getUsers';
import { useDispatch } from 'react-redux';

export const User = (props) => {
  const dispatch = useDispatch();
  const { email, id, name, role, phone } = props.user;
  const [userRole, setUserRole] = useState(role);

  const handleUserRole = (e) => {
    setUserRole(e.target.value);
  };
  const saveUserRole = () => {
    updateData(userRole, id);
    dispatch(getUsers());
  };

  return (
    <div className="container pt-4 pb-2">
      <ListGroup.Item>
        <div className="d-flex justify-content-between align-items-center ">
          <span className="w-25">Name: {name || 'user'}</span>
          <span className="w-25">Email: {email || 'email'}</span>
          <span className="w-25">Phone: {phone || 'empty'}</span>
          <div className="d-flex justify-content-between align-items-center">
            <select
              value={userRole}
              onChange={(e) => {
                handleUserRole(e);
              }}
              className="form-control mr-5"
            >
              <option value="driver">Driver</option>
              <option value="passenger">Passenger</option>
              <option value="dispatcher">Dispatcher</option>
            </select>
            <Button onClick={saveUserRole} variant="primary">
              Save
            </Button>
          </div>
        </div>
      </ListGroup.Item>
    </div>
  );
};
