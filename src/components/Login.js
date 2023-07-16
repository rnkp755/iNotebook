import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {

      const [credentials, setCredentials] = useState({ email: "", password: "" })

      let navigate = useNavigate();

      const handleSubmit = async (e) => {
            e.preventDefault();
            const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
                  method: 'POST',
                  headers: {
                        'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const json = await response.json();
            if (json.success) {
                  //Save the auth-token and Redirect to Homepage
                  localStorage.setItem('token', json.authToken);
                  props.showAlert("Logged In Successfully", "success");
                  navigate("/");
            }
            else {
                  props.showAlert("Invalid credentials", "danger");
            }
      }

      const onchange = (e) => {
            setCredentials({ ...credentials, [e.target.name]: e.target.value })
      }

      return (
            <form className="container mt-3" onSubmit={handleSubmit}>
                  <h2>Login To continue..</h2>
                  <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onchange} aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                  </div>
                  <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" onChange={onchange} value={credentials.password} />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
            </form>
      )
}

export default Login
