import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm'; 

export default function Home() {
  const [isRegistering, setIsRegistering] = useState(false); 

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      {isRegistering ? (
        <>
          <h1></h1>
          <RegisterForm setIsRegistering={setIsRegistering} /> {}
          <p>
            Already have an account?{' '}
            <button onClick={() => setIsRegistering(false)}>Login</button>
          </p>
        </>
      ) : (
        <>
          <h1></h1>
          <LoginForm setIsRegistering={setIsRegistering} /> {}
        </>
      )}
    </div>
  );
}
