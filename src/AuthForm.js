import React, { useState } from 'react';

function AuthForm() { // Encapsulate within a functional component
  // State declarations
  const [loginMode, setLoginMode] = useState(true); // Renamed 'login' to 'loginMode' for clarity
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({}); // Initialize errors as an empty object
  const [isLoading, setIsLoading] = useState(false);

  // Event handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for the current field as user types
    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 12) {
      newErrors.password = 'Password must be 12 characters or more';
    }

    // Only validate name and confirmPassword if not in login mode
    if (!loginMode) {
      if (!formData.name) {
        newErrors.name = 'Name is required';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors); // Correct way to update errors state
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop if validation fails
    }

    setIsLoading(true); // Set loading to true after successful validation

    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (loginMode) {
        // Handle login logic
        console.log('Logging in with:', { email: formData.email, password: formData.password });
        alert('Login successful');
      } else {
        console.log('Signing Up:', { // Added comma here
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        alert('Sign Up successful');
      }

      // Reset Form
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
      });
      setErrors({}); // Clear errors after successful submission

    } catch (error) {
      console.error('Authentication Error:', error);
      alert('An error occurred during authentication');
    } finally {
      setIsLoading(false); // Always set loading to false
    }
  };

  return (
    <div>
      <h1 className="auth-form-title">{loginMode ? 'Login' : 'Sign Up'}</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        {!loginMode && ( // Only show name field if not in login mode
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
          </div>
        )}
        <div>
          <label htmlFor="email">Email:</label>
          <input className="auth-form-input"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        {!loginMode && ( // Only show confirm password field if not in login mode
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
          </div>
        )}
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : (loginMode ? 'Login' : 'Sign Up')}
        </button>
      </form>
      <p>
        {loginMode ? "Don't have an account?" : "Already have an account?"}{' '}
        <button type="button" onClick={() => setLoginMode(!loginMode)}>
          {loginMode ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
}

export default AuthForm; // Export the component
