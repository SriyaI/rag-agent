import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { auth, provider, signInWithPopup } from '../firebase';
import { login, googleLogin } from '../redux/actions/authActions';
import GoogleIcon from '@mui/icons-material/Google';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login({ email, password }));
      navigate('/profile');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();
      console.log(token);
      // Dispatch the token and user info to the Redux store
      await dispatch(googleLogin({ token }));
      navigate('/profile');
    } catch (err) {
      console.error('Google Sign-In failed:', err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <div class="button-container">
          <button className="google-signin" onClick={handleGoogleSignIn}>
            <GoogleIcon /> Sign in with Google
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              data-cy="email-input"
            />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              data-cy="password-input"
            />
          </div>
          <div class="button-container">
            <button type="submit">Login</button>
          </div>
        </form>
        <p className="register-link">
          New here? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
