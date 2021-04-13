import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const [token, setToken] = useState('');
  const [error, setError] = useState('');

  const changeHandler = (e) => {
    setForm((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        'https://online-shop-web-mapsabootcamp.fandogh.cloud/login/',
        {
          method: 'POST',
          body: JSON.stringify(form),
          headers: {
            'content-type': 'application/json',
          },
        }
      );
      if (!res.ok) {
        const err = await res.json();
        setError(err);
        return;
      }
      const data = await res.json();
      setToken(data.token);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
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
