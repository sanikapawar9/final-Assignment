import { useState } from 'react';
import useAuth from '../contexts/AuthContext';
import AuthService from '../store/AuthService';
import classes from './AuthForm.module.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { login, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Perform login
        const isAuthenticated = AuthService.login(email, password);
        if (isAuthenticated) {
          alert('Login successful');
          login();
          setEmail('');
          setPassword('');
          navigate('/dashboard');
        }
      } else {
        // Perform signup
        AuthService.signup(email, password);
        alert('Signup successful');
        setIsLogin(true);
        setEmail('');
        setPassword('');
      }
    } catch (error) {
      alert(error.message);
      console.error('Authentication error:', error.message);
      setEmail('');
      setPassword('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className={classes.logout}>
          <p>You are logged in.</p>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <form className={classes.form} onSubmit={handleFormSubmit}>
          <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>
          <p>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </p>
          <p>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
          <div className={classes.actions}>
            <Button variant="success" type="submit">
              {isLogin ? 'Login' : 'Create'}
            </Button>
            <Button type="button" onClick={() => setIsLogin((prev) => !prev)}>
              {isLogin ? 'Go to create' : 'Go to Login'}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default AuthForm;
