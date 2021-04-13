import React, { useState } from 'react';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
  });

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
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
  );
};

export default SignUp;
