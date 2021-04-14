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
      <button onClick={clickHandler}>continue</button>
    </div>
  );
};

export default SignUpResult;