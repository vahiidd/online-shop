import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { loginUser, selectLogin } from './loginSlice';

const Login = () => {
  const { login, status, error } = useSelector(selectLogin);
  const dispatch = useDispatch();
  const history = useHistory();

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [token, setToken] = useState('');

  const changeHandler = (e) => {
    setForm((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    dispatch(loginUser({ form, history }));
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
      {error &&
        Object.entries(error).map(([key, value]) => (
          <div>
            {key} ==== {value}
          </div>
        ))}
    </div>
  );
};

export default Login;
