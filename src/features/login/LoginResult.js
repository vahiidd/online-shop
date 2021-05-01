import { Button } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSpecificProfile } from '../profile/profileSlice';
import { selectLogin } from './loginSlice';

const LoginResult = () => {
  const { token, status, error } = useSelector(selectLogin);
  const dispatch = useDispatch();
  const history = useHistory();

  const clickHandler = () => {
    if (status === 'success') {
      dispatch(getSpecificProfile(token));
      history.push('/');
    } else {
      history.push('/login');
    }
  };

  if (status === 'loading') {
    return <h1>Loading ...</h1>;
  }

  return (
    <div>
      <h1>{status === 'success' && 'successfully login'}</h1>
      <h1>
        {status === 'fail' &&
          Object.entries(error).map(([key, value]) => (
            <h1>
              {key} ==== {value}
            </h1>
          ))}
      </h1>
      <Button onClick={clickHandler}>continue</Button>
    </div>
  );
};

export default LoginResult;
