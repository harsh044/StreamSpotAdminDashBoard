import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State for managing the loader

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader at the start of API call

    try {
      // Start a temporary loader using SweetAlert
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });

      // Replace with your actual API URL
      const response = await fetch(
        `https://jmwfwjxlgopeoypfsvobxtdxvu0ppiuw.lambda-url.ap-south-1.on.aws/?username=${email}&password=${password}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('is_authenticated', true);
        localStorage.setItem('auth_token', data.token); // Store token for further API calls
        setIsAuthenticated(true);

        Swal.fire({
          icon: 'success',
          title: 'Successfully logged in!',
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        throw new Error(data.message || 'Authentication failed');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: error.message || 'Incorrect email or password.',
        showConfirmButton: true,
      });
    } finally {
      setLoading(false); // Hide loader once the API call completes
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleLogin}>
        <h1>Admin Login</h1>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading} // Disable input while loading
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          placeholder="qwerty"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading} // Disable input while loading
        />
        <button
          type="submit"
          style={{ marginTop: '12px' }}
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Logging in...' : 'Login'} {/* Change button text */}
        </button>
      </form>

      {loading && ( // Conditional rendering for the loader
        <div className="loader">
          <p></p> {/* Replace with a spinner or animation if preferred */}
        </div>
      )}
    </div>
  );
};

export default Login;
