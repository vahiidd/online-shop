import React from 'react';
import { useSelector } from 'react-redux';
import { selectProfile } from './profileSlice';

const Profile = () => {
  const { profile } = useSelector(selectProfile);
  return (
    <div>
      {Object.entries(profile[0]).map(([key, value]) => (
        <h2>
          {key}: {value}
        </h2>
      ))}
    </div>
  );
};

export default Profile;
