import React, { useState } from 'react';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

  const [error, setError] = useState('');

  const changeHandler = (e) => {
    setForm((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(
        'https://online-shop-web-mapsabootcamp.fandogh.cloud/signup',
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
      console.log(data);
    } catch (error) {
      console.error(error);
    }
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
      {error &&
        Object.entries(error).map(([key, value]) => (
          <div>
            {key} === {value}
          </div>
        ))}
    </div>
  );
};

export default SignUp;
