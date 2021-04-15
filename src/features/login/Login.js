import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { loginUser } from './loginSlice';

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
        <button>signUp</button>
      </Link>
      <form onSubmit={submit}>
        <input
          name='username'
          placeholder='username'
          value={form.username}
          onChange={changeHandler}
        />
        <input
          name='password'
          placeholder='password'
          value={form.password}
          onChange={changeHandler}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default Login;
