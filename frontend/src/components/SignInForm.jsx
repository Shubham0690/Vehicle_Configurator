import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';




function SignInForm() {

  const { t } = useTranslation();

  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const { login } = useContext(AuthContext);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    try {
      // First, try to authenticate the user
      const loginResponse = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      if (!loginResponse.ok) {
        if (loginResponse.status === 401) {
          alert("Invalid credentials");
        } else {
          throw new Error('Login failed');
        }
        return;
      }

      // After successful login, get the token
      const loginData = await loginResponse.json();
      if (loginData) {
        // Fetch the token from the server
        const tokenResponse = await fetch("http://localhost:8080/public/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(state),
        });

        if (!tokenResponse.ok) {
          throw new Error('Token generation failed');
        }

        const tokenData = await tokenResponse.json();
        if (tokenData.token) {
          // Store the token and username (e.g., in sessionStorage)
          sessionStorage.setItem("jwtToken", tokenData.token);
          localStorage.setItem("username", state.username); // Store username
          console.log("Username stored:", state.username);

          // Call login function from context
          login(tokenData.token);

          alert("Login successful!");
        } else {
          alert("Token generation failed");
        }
      } else {
        alert("Invalid user");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred during login");
    }

    // Clear the state
    setState({
      username: "",
      password: "",
    });
  };

  return (
    <div className="form-container sign-in-container">
      <form onSubmit={handleOnSubmit}>
        <h1>{t('Sign in')}</h1>
        <br />
        <input
          type="text"
          name="username"
          placeholder="Enter Username"
          value={state.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Forgot your password?</a>
        <button type="submit">{t('Sign in')}</button>
      </form>
    </div>
  );
}

export default SignInForm;
