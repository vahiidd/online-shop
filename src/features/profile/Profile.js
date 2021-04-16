import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLogin } from '../login/loginSlice';
import { selectProfile } from './profileSlice';

const Profile = () => {
  const { profile } = useSelector(selectProfile);
  const { token } = useSelector(selectLogin);
  const [form, setForm] = useState({
    username: profile[0].user,
    first_name: '',
    last_name: '',
    email: profile[0].email,
  });

  const changeHandler = (e) => {
    setForm((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const res = await fetch(
      `https://online-shop-web-mapsabootcamp.fandogh.cloud/edit_profile/update_profile/${profile[0].id}/`,
      {
        method: 'PUT',
        body: JSON.stringify(form),
        headers: {
          'content-type': 'application/json',
          Authorization: `Basic ${token}`,
        },
      }
    );
    const data = await res.json();
    console.log(data);
  };

  return (
    <div>
      <form onSubmit={updateProfile}>
        <div>
          <label>username</label>
          <input
            type='text'
            name='username'
            value={form.username}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label>first name</label>
          <input
            type='text'
            name='first_name'
            value={form.first_name}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label>last name</label>
          <input
            type='text'
            name='last_name'
            value={form.last_name}
            onChange={changeHandler}
          />
        </div>
        <div>
          <label>email</label>
          <input
            type='email'
            name='email'
            value={form.email}
            onChange={changeHandler}
          />
        </div>
        <div>
          <h4> phone: {profile[0].phone}</h4>
        </div>
        <button type='submit'>update</button>
      </form>
    </div>
  );
};

export default Profile;
