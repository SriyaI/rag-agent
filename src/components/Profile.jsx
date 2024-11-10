import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../redux/actions/authActions';
import './Profile.css'; // Make sure to create this file
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);
  const navigate=useNavigate();
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  if (!user) {
    return <div className="profile-container">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>Profile</h2>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        {user.company && <p>Company: {user.company}</p>}
      </div>
      <div class="button-container">
            <button type="submit" onClick={()=>navigate('/rag-agent')}>Go to RAG Agent</button>
      </div>
    </div>
  );
};

export default Profile;
