import { Button, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signUpUser } from './signUpSlice';

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const changeHandler = (e) => {
    setForm((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const submit = (e) => {
    e.preventDefault();
    dispatch(signUpUser(form));
    history.push('/signUpResult');
  };

  return (
    <div style={{ marginLeft: 10 }}>
      <form onSubmit={submit}>
        <div>
          <TextField
            placeholder='username'
            name='username'
            value={form.username}
            onChange={changeHandler}
          />
        </div>

        <div>
          <TextField
            placeholder='email'
            name='email'
            value={form.email}
            onChange={changeHandler}
          />
        </div>

        <div>
          <TextField
            placeholder='phone'
            name='phone'
            value={form.phone}
            onChange={changeHandler}
          />
        </div>

        <div>
          <TextField
            placeholder='password'
            name='password'
            value={form.password}
            onChange={changeHandler}
          />
        </div>

        <Button type='submit'>SignUp</Button>
      </form>
    </div>
  );
};

export default SignUp;
