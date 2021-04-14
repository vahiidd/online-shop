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
    dispatch(signUpUser({ form, history }));
  };

  return (
    <div>
      <form onSubmit={submit}>
        <input
          placeholder='username'
          name='username'
          value={form.username}
          onChange={changeHandler}
        />
        <input
          placeholder='email'
          name='email'
          value={form.email}
          onChange={changeHandler}
        />
        <input
          placeholder='phone'
          name='phone'
          value={form.phone}
          onChange={changeHandler}
        />
        <input
          placeholder='password'
          name='password'
          value={form.password}
          onChange={changeHandler}
        />
        <button type='submit'>SignUp</button>
      </form>
    </div>
  );
};

export default SignUp;
