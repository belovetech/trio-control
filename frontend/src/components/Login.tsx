import React, { useState } from 'react';
import { useAuth } from '../provider/AuthProvider';
import './Form.css';

interface LoginProps {
  onSuccessfulLogin: () => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onSuccessfulLogin, setIsLoggedIn }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);

  const { signIn } = useAuth();

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      setIsError(false);
      setIsLoggedIn(true);
      onSuccessfulLogin();
      alert('Sign-in successful');
    } catch (error) {
      setIsError(true);
      alert('Sign-in failed');
      console.log('Sign-in failed', error);
    }
    setEmail('');
    setPassword('');
  };

  const clearError = () => {
    if (isError) {
      setIsError(false);
    }
  };

  return (
    <div className='form-container'>
      <div>
        <h2>Welcome to Trio App</h2>
        <div className='form-group'>
          <label htmlFor='email'> Email </label>
          <input
            type='text'
            placeholder='Email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              clearError();
            }}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password'> Password</label>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              clearError();
            }}
          />
        </div>
        <button onClick={handleLogin}>Login</button>
        {isError && (
          <p className='error'>Invalid Email or password. Please try again.</p>
        )}
      </div>
    </div>
  );
};

export default Login;
