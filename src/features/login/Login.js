import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { loginUser } from './loginSlice';
import { Button, TextField } from '@material-ui/core';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const changeHandler = (e) => {
    setForm((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
    history.push('/loginResult');
  };

  return (
    <div>
      <Link to='/signUp'>
        <Button>signUp</Button>
      </Link>
      <form onSubmit={submit}>
        <div>
          <TextField
            name='username'
            placeholder='username'
            value={form.username}
            onChange={changeHandler}
          />
        </div>
        <div>
          <TextField
            name='password'
            placeholder='password'
            value={form.password}
            onChange={changeHandler}
          />
          <Button type='submit'>Login</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
