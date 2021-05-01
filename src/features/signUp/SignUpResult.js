import { Button } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { selectSignUp } from './signUpSlice';

const SignUpResult = () => {
  const { successMessage, error, status } = useSelector(selectSignUp);
  const history = useHistory();

  const clickHandler = () => {
    if (status === 'success') {
      history.push('/login');
    } else {
      history.push('/signUp');
    }
  };

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>{successMessage && successMessage.message}</h1>
      <h1>
        {status === 'fail' &&
          Object.entries(error).map(([key, value]) => (
            <p>
              {key} ==== {value}
            </p>
          ))}
      </h1>
      <Button onClick={clickHandler}>continue</Button>
    </div>
  );
};

export default SignUpResult;
