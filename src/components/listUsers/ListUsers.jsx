import React, { useEffect } from 'react';
import { ListGroup } from 'bootstrap-4-react';
import { User } from '../user/User';
import { Loader } from '../loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../thunk/getUsers';

export const ListUsers = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.users.loading);
  const users = useSelector((state) => state.users.usersList);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <ListGroup>
      {isLoading !== 'idle' && <Loader />}

      {users?.length === 0 && <h2 className="text-center pt-4">There are no users</h2>}
      {users.map((user) => {
        return <User user={user} key={user.id} />;
      })}
    </ListGroup>
  );
};
